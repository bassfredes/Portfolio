"use client";
import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full py-6 text-center text-xs text-gray-500 dark:text-gray-400">
    © {new Date().getFullYear()} Bastian Fredes. All rights reserved.
  </footer>
);

export default Footer;
