"use client";
import React from "react";

const ContactForm: React.FC = () => (
  <form
    className="flex-1 w-full max-w-md bg-slate-800/60 rounded-xl p-6 shadow-lg space-y-4 animate-slide-up delay-800"
    autoComplete="off"
    onSubmit={(e) => e.preventDefault()}
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
      className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-[1.03] active:scale-100 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
    >
      Send Message
    </button>
  </form>
);

export default ContactForm;
