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
      // Show banner if no consent is stored
      setIsVisible(true);
      setConsentGiven(false);
    } else {
      // Consent already given
      setConsentGiven(true);
      setIsVisible(false);
      // If consent was already given, ensure GA knows
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'functionality_storage': 'granted',
          'personalization_storage': 'granted'
        });
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
    setConsentGiven(true);
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted'
      });
      // Track consent acceptance event
      window.gtag('event', 'consent_granted', {
        'event_category': 'privacy',
        'event_label': 'cookie_consent_accepted'
      });
      console.log('Cookie consent granted and analytics updated.');
    }
  };

  if (!isVisible || consentGiven) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-white p-4 shadow-lg z-50 md:flex md:items-center md:justify-between">
      <p className="text-sm mb-3 md:mb-0 md:mr-4">
        bassfredes.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic.
        <Link href="/cookies" className="underline hover:text-neutral-300 ml-1">
          Learn more.
        </Link>
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-150"
        aria-label="Accept and close cookie banner"
      >
        Got it
      </button>
    </div>
  );
}

// Add gtag type to window for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
