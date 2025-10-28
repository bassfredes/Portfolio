// src/utils/analytics.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Tipos para eventos personalizados
export type CustomEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Función para enviar eventos personalizados
export const trackEvent = (event: CustomEvent) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
};

// Función para enviar pageviews manuales
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: url,
    });
  }
};

// Declaración global para TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}