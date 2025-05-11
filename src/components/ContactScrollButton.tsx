"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function pageview(url: string) {
  if (typeof window.gtag === "function" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

interface ContactScrollButtonProps {
  className?: string;
}

const ContactScrollButton: React.FC<ContactScrollButtonProps> = ({ className = "" }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    pageview(pathname);
  }, [pathname]);

  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer scroll-smooth duration-300 ${className}`}
      onClick={() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <FaEnvelope size={16} /> Contact me
    </button>
  );
};

export default ContactScrollButton;
