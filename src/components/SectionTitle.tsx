"use client";
import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${className}`}>{children}</h2>
);

export default SectionTitle;
