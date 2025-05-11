"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

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
  const router = useRouter();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    pageview(pathname);
  }, [pathname]);

  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        type="button"
        className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer scroll-smooth duration-300"
        onClick={() => {
          if (pathname !== "/contact") {
            router.push("/contact");
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <FaEnvelope size={16} /> Contact me
      </button>
      <a
        href="https://www.linkedin.com/in/bassfredes/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-2 rounded-full border-2 border-blue-400 text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-[#181c2a] font-semibold transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer duration-300 shadow-sm hover:border-blue-500 hover:text-blue-600"
        style={{ textDecoration: 'none' }}
      >
        <FaLinkedin size={16} /> LinkedIn
      </a>
    </div>
  );
};

export default ContactScrollButton;
