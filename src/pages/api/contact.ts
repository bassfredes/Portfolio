import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// ENV: process.env.RECAPTCHA_SECRET_KEY, process.env.GMAIL_USER

// Utilidad para obtener variables de entorno compatible con local (.env), GitHub Actions y Firebase Functions
async function getEnv(key: string, fallback?: string): Promise<string> {
  // 1. Firebase Functions config (import dinámico solo si está en Functions)
  if (typeof process.env.FUNCTIONS_EMULATOR !== 'undefined' || process.env.K_SERVICE) {
    try {
      // Import dinámico para evitar require en Next.js puro y soportar ESM
      const functions = await import('firebase-functions');
      const config = functions.default?.config ? functions.default.config() : functions.config();
      const [namespace, prop] = key.toLowerCase().split('_');
      if (config[namespace] && config[namespace][prop]) {
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

async function verifyRecaptcha(token: string) {
  const secret = await getEnv("RECAPTCHA_SECRET_KEY");
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });
  return res.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, message, recaptchaToken } = req.body;
  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // 1. Validar reCAPTCHA v3
  const recaptcha = await verifyRecaptcha(recaptchaToken);
  if (!recaptcha.success || recaptcha.score < 0.5) {
    return res.status(400).json({ error: "reCAPTCHA failed" });
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
    await transporter.sendMail({
      from: `Portfolio Contact <${await getEnv("GMAIL_USER")}>`,
      to: await getEnv("GMAIL_USER"),
      subject: `New message from Bastian Fredes' portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(
        /\n/g,
        "<br/>"
      )}</p>`,
    });
    return res.status(200).json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("err :>> ", err);
    return res.status(500).json({ error: "Failed to send the message. Please try again later." });
  }
}
