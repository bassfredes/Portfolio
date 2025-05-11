"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const pathToSection: Record<string, string> = {
  "/": "hero",
  "/experience": "experience",
  "/projects": "projects",
  "/about": "about",
  "/contact": "contact",
};

export default function SectionScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = pathToSection[pathname];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, [pathname]);

  return null;
}
