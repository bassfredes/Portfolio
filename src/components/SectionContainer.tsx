import React from "react";

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
}) => (
  <section
    id={id}
    data-section={id}
    role={role || "region"}
    aria-label={ariaLabel || title || id}
    className={`scroll-m-20 w-full mx-auto max-w-3xl px-4 md:px-0 py-12 md:py-20 ${className}`}
  >
    {children}
  </section>
);

export default SectionContainer;
