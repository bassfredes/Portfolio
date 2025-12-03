"use client";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  loading: () => <div className="w-full max-w-md p-8 text-center text-gray-400">Loading contact form…</div>,
  ssr: false,
});

export default function ContactFormClientWrapper() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
    rootMargin: "200px",
  });

  return (
    <div ref={ref} className="w-full flex justify-center min-h-[400px]">
      {isVisible ? <ContactForm /> : null}
    </div>
  );
}
