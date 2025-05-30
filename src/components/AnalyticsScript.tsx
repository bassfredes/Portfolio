'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// IMPORTANT: Replace with actual environment variable in your project setup (e.g., .env.local)
// For example: const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GTM_ID = 'GTM-T69XG2RH'; // Hardcoded for this example, replace with process.env.NEXT_PUBLIC_GTM_ID

const AnalyticsScript = () => {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check for consent in localStorage on component mount (client-side only).
    // This determines if the GTM <script> tag should be rendered.
    const consentGiven = localStorage.getItem('cookie_consent_given') === 'true';
    setHasConsent(consentGiven);
  }, []);

  return (
    <>
      {/*
        The GTM <script> tag is loaded using next/script.
        It is only rendered and loaded if 'hasConsent' is true,
        meaning the user has accepted cookies via the consent banner.
        The 'afterInteractive' strategy loads the script after the page becomes interactive.
      */}
      {hasConsent && GTM_ID && (
        <Script
          id="gtm-script-next" // Unique ID for the script tag managed by next/script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      )}

      {/*
        The GTM <noscript> tag is rendered directly in the JSX.
        This ensures it's present in the initial HTML for users with JavaScript disabled.
        In such cases, client-side consent mechanisms (like the banner) and the conditional
        loading of the <script> tag won't apply. The noscript tag will operate based on
        GTM's default behavior when JS is off.
        It uses the same GTM_ID from the environment variable.
      */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            aria-hidden="true"
          ></iframe>
        </noscript>
      )}
    </>
  );
};

export default AnalyticsScript;
