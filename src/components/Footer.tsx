"use client";
import React from "react";
import Link from "next/link"; // Importar Link

const Footer: React.FC = () => (
  <footer className="w-full py-6 text-center text-xs text-gray-500 dark:text-gray-400">
    <p>© {new Date().getFullYear()} Bastian Fredes. All rights reserved.</p>
    <p className="mt-2">
      <Link href="/cookies" className="hover:underline">
        Cookie Policy
      </Link>
    </p>
  </footer>
);

export default Footer;
