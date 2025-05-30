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
      // Set default consent to denied if no choice has been made.
      // This ensures that Google tags operate in a restricted mode before explicit user consent.
      // All categories (analytics_storage, ad_storage, ad_user_data, ad_personalization)
      // are set to 'denied' by default.
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
        });
      }
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
          'analytics_storage': 'granted'
        });
      }
    }
    // No cleanup needed for a timer anymore
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    // Flag to indicate that the GTM script can be loaded by AnalyticsScript.tsx
    // This is set upon user acceptance of cookie consent.
    localStorage.setItem('gtm_script_loaded', 'true');
    setIsVisible(false);
    setConsentGiven(true);
    // When the user accepts, update the consent state for Google tags.
    // All relevant categories are set to 'granted'.
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
      });
      // You might want to trigger a pageview or event here if needed
      // window.gtag('event', 'consent_given', { 'event_category': 'cookie_consent', 'event_label': 'accepted' });
      console.log('Cookie consent granted and all categories updated to granted.');
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
