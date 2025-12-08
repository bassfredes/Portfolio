import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { z } from "zod";

// Función para escapar caracteres HTML y prevenir XSS
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

// Función para sanitizar campos de cabecera (name, email) y prevenir header injection.
// No usar en campos que permiten saltos de línea (como message).
function sanitizeHeaderField(text: string): string {
  // Eliminar caracteres de control y saltos de línea múltiples que puedan usarse para ataques de header injection
  return text.replace(/[\r\n]+/g, ' ').trim();
}

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
  // Honeypot field - should be empty
  website: z.string().optional(),
  // Form render timestamp for timing check
  formRenderTime: z.number().optional(),
});

// Simple in-memory rate limiter (para producción, usar Redis/Upstash)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  
  // Limpiar entradas viejas mientras verificamos el rate limit
  for (const [key, record] of rateLimiter.entries()) {
    if (now > record.resetAt) {
      rateLimiter.delete(key);
    }
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

// Función auxiliar para hashear IP (mejor privacidad en logs)
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 8);
}

// ENV: process.env.RECAPTCHA_SECRET_KEY, process.env.GMAIL_USER

// Utilidad para obtener variables de entorno compatible con local (.env), GitHub Actions y Firebase Functions
async function getEnv(key: string, fallback?: string): Promise<string> {
  // 1. Firebase Functions config (import dinámico solo si está en Functions)
  if (typeof process.env.FUNCTIONS_EMULATOR !== 'undefined' || process.env.K_SERVICE) {
    try {
      // Import dinámico para evitar require en Next.js puro y soportar ESM
      const functions = await import('firebase-functions');
      const configModule = functions as {
        config?: () => Record<string, Record<string, string>>;
        default?: { config?: () => Record<string, Record<string, string>> };
      };
      const configFn = configModule.config ?? configModule.default?.config;
      const config = typeof configFn === "function" ? configFn() : undefined;
      const [namespace, prop] = key.toLowerCase().split('_');
      if (config && config[namespace] && config[namespace][prop]) {
        return config[namespace][prop];
      }
    } catch {
      // Si no existe el módulo, sigue con process.env
      if (process.env[key]) return process.env[key]!;
      if (fallback) return fallback;
      throw new Error(`Missing env variable: ${key} (firebase-functions not found)`);
    }
  }
  // 2. Variable de entorno estándar (local, Vercel, Actions, etc)
  if (process.env[key]) return process.env[key]!;
  if (fallback) return fallback;
  throw new Error(`Missing env variable: ${key}`);
}

async function verifyRecaptcha(token: string, expectedAction = "contact") {
  const secret = await getEnv("RECAPTCHA_SECRET_KEY");
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
  
  // Verificar action y hostname para prevenir uso de tokens robados
  if (result.success) {
    if (result.action !== expectedAction) {
      console.warn("reCAPTCHA action mismatch:", result.action, "expected:", expectedAction);
      return { ...result, success: false, error: "action_mismatch" };
    }
    // Opcional: verificar hostname en producción
    // const allowedHostnames = ["bassfredes.com", "www.bassfredes.com", "localhost"];
    // if (!allowedHostnames.includes(result.hostname)) {
    //   console.warn("reCAPTCHA hostname mismatch:", result.hostname);
    //   return { ...result, success: false, error: "hostname_mismatch" };
    // }
  }
  
  return result;
}

// Configuración para limitar el tamaño del body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '256kb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  // Obtener IP para rate limiting (compatible con proxies)
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() 
    || (req.headers['x-real-ip'] as string) 
    || req.socket.remoteAddress 
    || 'unknown';

  // Rate limiting: 5 requests por 10 minutos
  if (!checkRateLimit(ip)) {
    console.warn(`Rate limit exceeded for IP hash: ${hashIP(ip)}`);
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  // Validar el schema de entrada
  const validation = contactSchema.safeParse(req.body);
  if (!validation.success) {
    console.warn("Validation failed:", validation.error.issues[0].message);
    return res.status(400).json({ error: "Invalid input. Please check your data." });
  }

  const { name, email, message, recaptchaToken, website, formRenderTime } = validation.data;

  // Honeypot check - si el campo "website" está lleno, es un bot
  if (website && website.trim() !== "") {
    console.warn("Honeypot triggered for IP hash:", hashIP(ip));
    // Devolver éxito falso para no revelar la defensa
    return res.status(400).json({ error: "Invalid request" });
  }

  // Timing check - el formulario debe tomar al menos 2 segundos para completarse
  if (formRenderTime) {
    const timeTaken = Date.now() - formRenderTime;
    if (timeTaken < 2000) {
      console.warn("Form submitted too quickly:", timeTaken, "ms for IP hash:", hashIP(ip));
      return res.status(400).json({ error: "Please take your time filling the form" });
    }
  }

  // 1. Validar reCAPTCHA v3 con score más alto y verificación de action
  const recaptcha = await verifyRecaptcha(recaptchaToken, "contact");
  if (!recaptcha.success || recaptcha.score < 0.5) {
    console.warn("reCAPTCHA failed - success:", recaptcha.success, "score:", recaptcha.score, "error:", recaptcha.error);
    return res.status(400).json({ error: "Security verification failed. Please try again." });
  } else if (recaptcha.score < 0.7) {
    console.warn("reCAPTCHA score low but not blocked - score:", recaptcha.score, "IP hash:", hashIP(ip));
    return res.status(400).json({ error: "We couldn't verify you're not a bot. Please try again or complete additional verification." });
  }

  // 2. Enviar correo usando Gmail API
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: await getEnv("GMAIL_USER"),
      clientId: await getEnv("GMAIL_CLIENT_ID"),
      clientSecret: await getEnv("GMAIL_CLIENT_SECRET"),
      refreshToken: await getEnv("GMAIL_REFRESH_TOKEN"),
      accessToken: process.env.GMAIL_ACCESS_TOKEN, // opcional
    },
  });

  try {
    // Sanitizar inputs para prevenir XSS en el HTML del email
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // Sanitizar para texto plano (prevenir header injection)
    const plainName = sanitizePlainText(name.trim());
    const plainEmail = sanitizePlainText(email.trim());
    const plainMessage = message.trim(); // mantener saltos de línea en el mensaje

    await transporter.sendMail({
      from: `Portfolio Contact <${await getEnv("GMAIL_USER")}>`,
      to: await getEnv("GMAIL_USER"),
      subject: `New message from Bastian Fredes' portfolio`,
      replyTo: plainEmail, // usar email sanitizado
      text: `Name: ${plainName}\nEmail: ${plainEmail}\nMessage: ${plainMessage}`,
      html: `<p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Message:</b><br/>${safeMessage.replace(
        /\n/g,
        "<br/>"
      )}</p>`,
    });
    return res.status(200).json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email sending failed:", err instanceof Error ? err.message : "unknown error");
    return res.status(500).json({ error: "Failed to send the message. Please try again later." });
  }
}
