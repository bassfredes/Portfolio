"use client";

import React, { useEffect, useRef } from "react";

interface SectionContainerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  ariaLabel?: string;
  role?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = "",
  children,
  title,
  ariaLabel,
  role,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;

    const anchors = Array.from(el.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    anchors.forEach((a) => {
      try {
        const href = a.href;
        // Only set target for external links
        const isExternal = href.startsWith('http') && new URL(href).origin !== window.location.origin;
        if (isExternal) {
          a.setAttribute('target', '_blank');
          // Preserve any existing rel values and add noopener noreferrer
          const rel = (a.getAttribute('rel') || '').split(' ').filter(Boolean);
          ['noopener', 'noreferrer'].forEach((r) => { if (!rel.includes(r)) rel.push(r); });
          a.setAttribute('rel', rel.join(' '));
        }
      } catch (e) {
        // ignore malformed URLs
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section={id}
      role={role || "region"}
      aria-label={ariaLabel || title || id}
      className={`scroll-m-20 w-full mx-auto max-w-3xl px-4 md:px-0 py-12 md:py-20 ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
