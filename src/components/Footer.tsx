"use client";
import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full max-w-2xl mx-auto rounded-xl text-center py-6 px-4 text-zinc-800/90 dark:text-zinc-200/90 text-xs mt-16 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
    <div>
      © {new Date().getFullYear()} Bastian Fredes. All rights reserved.
    </div>
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4 text-zinc-500/90 dark:text-white/90">
      <a href="#sobre-mi" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors">Sobre mí</a>
      <a href="mailto:bastian.fredes@gmail.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors">Contacto</a>
    </nav>
  </footer>
);

export default Footer;
