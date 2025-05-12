"use client";
import React from "react";

export default function ContactInfoObfuscated({ email, phone }: { email: string; phone: string }) {
  // Obfuscate email and phone for bots
  const emailParts = email.split("");
  const phoneParts = phone.split("");
  return (
    <span className="block mt-4 text-sm text-gray-600 dark:text-gray-400 select-text">
      <b>Email:</b>{" "}
      <a href={`mailto:${email}`}>{emailParts.map((c, i) => <span key={i}>{c}</span>)}</a>
      <span className="mx-2">|</span>
      <b>Phone:</b>{" "}
      <a href={`tel:${phone.replace(/\s/g, "")}`} rel="nofollow">
        {phoneParts.map((c, i) => <span key={i}>{c}</span>)}
      </a>
    </span>
  );
}
