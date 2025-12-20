import { onRequest, HttpsOptions } from "firebase-functions/v2/https";
import * as nodemailer from "nodemailer";
import { z } from "zod";
import { createHash } from "crypto";

// Esquema de validación estricto para el formulario de contacto
const contactSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .refine((val) => !/[\r\n]/.test(val), "Name cannot contain line breaks"),
  email: z.string()
    .email("Invalid email format")
    .max(254, "Email must be less than 254 characters")
    .refine((val) => !/[\r\n]/.test(val), "Email cannot contain line breaks"),
  message: z.string()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters")
    .refine((val) => !/\n{4,}/.test(val), "Message cannot contain more than 3 consecutive newlines"),
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
  website: z.string().optional(), // Honeypot
  formRenderTime: z.number().optional(),
});

// Función para escapar caracteres HTML
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

// Función para sanitizar campos de cabecera
function sanitizeHeaderField(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim();
}

// Rate limiting en memoria (para una única instancia de función)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000;

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();

  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, record] of rateLimiter.entries()) {
      if (now > record.resetAt) {
        rateLimiter.delete(key);
      }
    }
    lastCleanup = now;
  }

  const record = rateLimiter.get(ip);

  if (!record || now > record.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").substring(0, 12);
}

async function verifyRecaptcha(token: string, secret: string, expectedAction = "contact") {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });

  if (!res.ok) {
    console.warn("reCAPTCHA verification request failed:", res.status);
    return { success: false, error: "verification_failed" };
  }

  const result = await res.json();

  if (result.success && result.action !== expectedAction) {
    console.warn("reCAPTCHA action mismatch:", result.action, "expected:", expectedAction);
    return { ...result, success: false, error: "action_mismatch" };
  }

  return result;
}

// Configuración de la Cloud Function
const functionOptions: HttpsOptions = {
  region: "us-east1",
  timeoutSeconds: 30,
  memory: "256MiB",
  maxInstances: 3, // Limitar instancias para controlar costos
  minInstances: 0, // Sin instancias mínimas (escala a 0 cuando no hay uso)
  cors: [
    "https://www.bassfredes.dev",
    "https://bassfredes.dev",
    "https://bassfredes-portfolio.web.app",
    "https://bassfredes-portfolio.firebaseapp.com",
  ],
};

// Cloud Function para el formulario de contacto
export const contact = onRequest(functionOptions, async (req, res) => {
    // Preflight ya manejado por cors option

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    // Obtener IP
    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.ip ||
      "unknown";

    // Rate limiting
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP hash: ${hashIP(ip)}`);
      res.status(429).json({ error: "Too many requests. Please try again later." });
      return;
    }

    // Validar entrada
    const validation = contactSchema.safeParse(req.body);
    if (!validation.success) {
      console.warn("Validation failed:", validation.error.issues.map((i) => i.message));
      res.status(400).json({ error: "Invalid input. Please check your data." });
      return;
    }

    const { name, email, message, recaptchaToken, website, formRenderTime } = validation.data;

    // Honeypot check
    if (website && website.trim() !== "") {
      console.warn("Honeypot triggered for IP hash:", hashIP(ip));
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    // Timing check
    if (formRenderTime) {
      const timeTaken = Date.now() - formRenderTime;
      if (timeTaken < 1000) {
        console.warn("Form submitted too quickly:", timeTaken, "ms");
        res.status(400).json({ error: "Please take your time filling the form" });
        return;
      }
    }

    // Obtener secretos de variables de entorno (Firebase v2 usa defineSecret o env vars)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const gmailUser = process.env.GMAIL_USER;
    const gmailClientId = process.env.GMAIL_CLIENT_ID;
    const gmailClientSecret = process.env.GMAIL_CLIENT_SECRET;
    const gmailRefreshToken = process.env.GMAIL_REFRESH_TOKEN;

    if (!recaptchaSecret || !gmailUser || !gmailClientId || !gmailClientSecret || !gmailRefreshToken) {
      console.error("Missing configuration. Check Firebase Functions config.");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    // Verificar reCAPTCHA
    const recaptcha = await verifyRecaptcha(recaptchaToken, recaptchaSecret, "contact");

    if (!recaptcha.success) {
      console.warn("reCAPTCHA failed:", recaptcha.error);
      res.status(400).json({ error: "Security verification failed. Please try again." });
      return;
    }

    if (recaptcha.score < 0.5) {
      console.warn("reCAPTCHA score too low:", recaptcha.score);
      res.status(400).json({ error: "Security verification failed. Please try again." });
      return;
    }

    // Enviar email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: gmailUser,
        clientId: gmailClientId,
        clientSecret: gmailClientSecret,
        refreshToken: gmailRefreshToken,
      },
    });

    try {
      const safeName = escapeHtml(name.trim());
      const safeEmail = escapeHtml(email.trim());
      const safeMessage = escapeHtml(message.trim());

      const plainName = sanitizeHeaderField(name.trim());
      const plainEmail = sanitizeHeaderField(email.trim());
      const plainMessage = message.trim();

      await transporter.sendMail({
        from: `Portfolio Contact <${gmailUser}>`,
        to: gmailUser,
        subject: "New message from Bastian Fredes' portfolio",
        replyTo: plainEmail,
        text: `Name: ${plainName}\nEmail: ${plainEmail}\nMessage: ${plainMessage}`,
        html: `<p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Message:</b><br/>${safeMessage.replace(/\n/g, "<br/>")}</p>`,
      });

      res.status(200).json({ ok: true, message: "Message sent successfully!" });
    } catch (err) {
      console.error("Email sending failed:", err instanceof Error ? err.message : "unknown error");
      res.status(500).json({ error: "Failed to send the message. Please try again later." });
    }
  });
