"use client";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

interface ContactScrollButtonProps {
  className?: string;
}

const ContactScrollButton: React.FC<ContactScrollButtonProps> = ({ className = "" }) => {
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
