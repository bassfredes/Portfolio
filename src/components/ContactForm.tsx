"use client";
import React, { useRef, useState } from "react";

// Extiende el tipo Window para grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      execute(siteKey: string, opts: { action: string }): Promise<string>;
    };
  }
}

// Cargar reCAPTCHA v3 dinámicamente y exponer función para obtener el token
function useRecaptchaV3(siteKey: string) {
  const [ready, setReady] = useState(false);
  React.useEffect(() => {
    if (window.grecaptcha) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey]);
  const execute = async (action: string) => {
    if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded");
    return window.grecaptcha.execute(siteKey, { action });
  };
  return { ready, execute };
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ready, execute } = useRecaptchaV3(RECAPTCHA_SITE_KEY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      if (!ready) throw new Error("reCAPTCHA not ready");
      const recaptchaToken = await execute("contact");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      const json = await res.json();
      if (res.ok) {
        setSuccess("Message sent successfully!");
        form.reset();
      } else {
        setError(json.error || "Failed to send the message. Please try again later.");
      }
    } catch (err) {
      setError((err as Error).message || "Failed to send the message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="flex-1 w-full max-w-md bg-slate-800/60 rounded-xl p-6 shadow-lg space-y-4 animate-slide-up delay-800"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full px-4 py-2 rounded bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full px-4 py-2 rounded bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={4}
        className="w-full px-4 py-2 rounded bg-slate-900 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.03] active:scale-100 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 text-base disabled:opacity-60"
        disabled={loading || !ready}
      >
        {loading ? "Enviando..." : "Send Message"}
      </button>
      {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
    </form>
  );
};

export default ContactForm;
