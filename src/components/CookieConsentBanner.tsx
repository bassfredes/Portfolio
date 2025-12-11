'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent_given';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(true); // Default to true to avoid flash of banner

  useEffect(() => {
    // Check localStorage only on the client-side
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!storedConsent) {
      // Show banner if no consent is stored, but with a delay to avoid LCP impact
      const timer = setTimeout(() => {
        setIsVisible(true);
        setConsentGiven(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      // Consent already given/declined
      setConsentGiven(true);
      setIsVisible(false);
      
      // Apply stored consent preferences to gtag
      if (typeof window.gtag === 'function') {
        if (storedConsent === 'accepted') {
          window.gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'granted',
            'functionality_storage': 'granted',
            'personalization_storage': 'granted'
          });
        } else if (storedConsent === 'declined') {
          window.gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied'
          });
        }
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    setConsentGiven(true);
    
    // Siempre llamar gtag (real o mock)
    if (typeof window !== 'undefined') {
      // Crear mock si no existe
      if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
          console.log('🔍 Mock gtag (Accept):', args);
        };
      }
      
      window.gtag('consent', 'update', {
        'ad_storage': 'denied', // Mantenemos ads como denied para privacidad
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'granted', // ✅ Permitimos analytics
        'functionality_storage': 'granted',
        'personalization_storage': 'granted'
      });
      
      // Track consent acceptance event
      window.gtag('event', 'consent_granted', {
        'event_category': 'privacy',
        'event_label': 'cookie_consent_accepted'
      });
      
      console.log('✅ Cookie consent granted - Analytics allowed!');
    }
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    setConsentGiven(true);
    
    // Siempre llamar gtag (real o mock)
    if (typeof window !== 'undefined') {
      // Crear mock si no existe
      if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
          console.log('🔍 Mock gtag (Decline):', args);
        };
      }
      
      // Solo cookies esenciales - rechazamos todo lo no esencial
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied', // ❌ Rechazamos analytics
        'functionality_storage': 'denied',
        'personalization_storage': 'denied'
      });
      
      // Track consent decline event  
      window.gtag('event', 'consent_declined', {
        'event_category': 'privacy',
        'event_label': 'cookie_consent_declined'
      });
      
      console.log('❌ Cookie consent declined - Only essential cookies allowed');
    }
  };

  if (!isVisible || consentGiven) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm md:flex-1">
          We use cookies to improve your experience and analyze traffic.
          <Link href="/cookies" className="underline hover:text-neutral-300 ml-1">
            Learn more.
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleDecline}
            className="bg-neutral-600 hover:bg-neutral-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150 border border-neutral-500"
            aria-label="Decline optional cookies - essential only"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-150"
            aria-label="Accept all cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

// Función exportada para permitir cambiar preferencias de cookies
export const updateCookieConsent = (consent: 'accepted' | 'declined') => {
  localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  
  if (typeof window.gtag === 'function') {
    if (consent === 'accepted') {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied', 
        'ad_personalization': 'denied',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted'
      });
    } else {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied'
      });
    }
  }
};

// Add gtag type to window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
