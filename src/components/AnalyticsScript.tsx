import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const AnalyticsScript = () => {
  // Prefer GTM if available, fallback to direct GA4
  const useGTM = !!GTM_ID;
  
  // Always load analytics infrastructure for Consent Mode v2
  // Even without actual IDs for development/testing
  const shouldLoadAnalytics = useGTM || GA_MEASUREMENT_ID || process.env.NODE_ENV === 'development';

  return (
    <>
      {useGTM ? (
        <>
          {/* Google Consent Mode v2 - Must be loaded before GTM */}
          <Script id="google-consent-mode" strategy="afterInteractive">
            {`
              // Initialize dataLayer before GTM loads
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent to denied for all categories (Consent Mode v2)
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted'
              });
            `}
          </Script>
          {/* Google Tag Manager */}
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        </>
      ) : (
        shouldLoadAnalytics && (
          <>
            {/* Always load gtag infrastructure for Consent Mode v2 */}
            <Script id="gtag-lib" strategy="afterInteractive">
              {GA_MEASUREMENT_ID ? `
                // Load gtag library
                (function() {
                  var script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                  document.head.appendChild(script);
                })();
              ` : '// No GA library loaded - using mock gtag for development'}
            </Script>
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                // Set default consent mode v2 (always deny by default)
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied',
                  'functionality_storage': 'denied',
                  'personalization_storage': 'denied',
                  'security_storage': 'granted'
                });
                
                // Only configure GA if we have an actual measurement ID
                ${GA_MEASUREMENT_ID ? `
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: false, // Deshabilitar pageview automático
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
                ` : '// No GA_MEASUREMENT_ID - consent mode still available for testing'}
              `}
            </Script>
          </>
        )
      )}
    </>
  );
};

export default AnalyticsScript;
