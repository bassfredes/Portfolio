"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
    
    if (!pathname) return;
    
    // En desarrollo, funciona sin GA_MEASUREMENT_ID para testing de consent mode
    
    // Pequeño delay para asegurar que gtag esté completamente cargado
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Método estándar para tracking de páginas en SPA
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: pathname,
        });
        
        // Log para desarrollo/debugging
        console.log('📊 Analytics pageview tracked:', pathname, 'GA_ID:', GA_MEASUREMENT_ID);
      } else if (typeof window !== 'undefined') {
        // En desarrollo - crear mock gtag si no existe
        if (!window.gtag) {
          window.gtag = (...args: unknown[]) => {
            console.log('🔍 Mock gtag called:', args);
          };
        }
        // Llamar al mock
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: pathname,
        });
      }
    };

    // Ejecutar con un pequeño delay para evitar problemas de timing
    setTimeout(trackPageView, 50);
  }, [pathname]);
};

export default useAnalytics;
