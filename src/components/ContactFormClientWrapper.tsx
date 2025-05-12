"use client";
import dynamic from "next/dynamic";
import React from "react";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="w-full max-w-md p-8 text-center text-gray-400">Loading contact form…</div>,
  ssr: false,
});

export default function ContactFormClientWrapper() {
  return <ContactForm />;
}
