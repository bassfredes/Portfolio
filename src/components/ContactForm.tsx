"use client";
import React, { useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      execute(siteKey: string, opts: { action: string }): Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [grecaptchaReady, setGrecaptchaReady] = useState(false);

  const handleRecaptchaLoad = () => {
    if (window.grecaptcha) setGrecaptchaReady(true);
  };

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
      if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded");
      const recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "contact" });
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
    <>
      <Script
        id="recaptcha-script"
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
        async
        defer
        onLoad={handleRecaptchaLoad}
      />
      <form
        ref={formRef}
        className="flex-1 w-full max-w-md bg-white dark:bg-slate-800/60 rounded-xl p-6 space-y-4 animate-slide-up delay-800 border border-slate-200 dark:border-slate-700"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          className="w-full px-4 py-2 rounded bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-[1.03] active:scale-100 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 text-base disabled:opacity-60"
          disabled={loading || !grecaptchaReady}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
        {success && <div className="text-green-700 dark:text-green-400 text-sm mt-2">{success}</div>}
        {error && <div className="text-red-700 dark:text-red-400 text-sm mt-2">{error}</div>}
      </form>
    </>
  );
};

export default ContactForm;
