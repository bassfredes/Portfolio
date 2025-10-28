"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
    
    if (!GA_MEASUREMENT_ID || !pathname) return;
    
    // Usar el método estándar recomendado de GA4
    if (typeof window !== 'undefined' && window.gtag) {
      // Método estándar para tracking de páginas en SPA
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);
};

export default useAnalytics;
