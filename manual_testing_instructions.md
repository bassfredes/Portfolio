# Manual Testing Instructions: Consent Mode v2 Implementation

This document provides detailed steps for manually testing the Consent Mode v2 implementation on the website.

## 1. Prerequisites

*   **Modern Web Browser:** Use a current version of a browser like Google Chrome or Mozilla Firefox.
*   **Browser Developer Tools:** Familiarize yourself with accessing and using the browser's developer tools, specifically:
    *   **Network Tab:** To monitor network requests (e.g., GTM script loading).
    *   **Console Tab:** To check for errors and interact with `dataLayer`.
    *   **Application Tab (Chrome) / Storage Tab (Firefox):** To inspect `localStorage` and clear site data.
*   **Google Consent Mode Debugger (Recommended for Chrome):**
    *   Install the "Google Consent Mode debugger" extension from the Chrome Web Store. This provides an easy way to view the current consent state.
    *   **Alternative (Manual `dataLayer` Check):** If not using the extension, you can check the `dataLayer` by typing `window.dataLayer` in the browser console. Look for events of type `consent` and `default` or `update` to see the states. Example:
        ```javascript
        // Type in console and press Enter
        window.dataLayer.filter(e => e[0] === 'consent');
        ```
        This will show you the history of consent commands. The active state is determined by the last `default` (if no `update` has occurred) or the last `update`.
*   **Environment Variable (for Local Development/Testing):**
    *   Ensure the `NEXT_PUBLIC_GTM_ID` environment variable is correctly set in your local development environment (e.g., in a `.env.local` file). This variable provides the GTM Container ID (e.g., `GTM-T69XG2RH`) used by the application. If this is not set, GTM will not load.

## 2. Test Case 1: Initial Visit - No Consent Stored

This test verifies the default behavior when a user visits the site for the first time or after their site data has been cleared.

1.  **Clear Site Data:**
    *   Open Developer Tools.
    *   Go to the **Application** tab (Chrome) or **Storage** tab (Firefox).
    *   Under "Storage" (or similar section), find "Local Storage" and "Cookies".
    *   Right-click on the website's domain and select "Clear" for both `localStorage` and cookies. Ensure all site data, including Service Workers, is cleared if possible (e.g., Chrome Application tab -> Storage -> "Clear site data" button).
2.  **Load the Application:**
    *   Navigate to the website's homepage.
3.  **Verify Observations:**
    *   **Cookie Consent Banner:**
        *   **Expected:** The cookie consent banner should be visible on the page.
    *   **Network Tab (Developer Tools):**
        *   Filter for `gtm.js` or the GTM Container ID specified by `NEXT_PUBLIC_GTM_ID`.
        *   **Expected:** No network requests for `gtm.js` or any Google Analytics related scripts should be made automatically on page load *before* consent is given.
    *   **Consent State (Using Consent Mode Debugger or `dataLayer`):**
        *   **Consent Mode Debugger:** Open the extension.
        *   **`dataLayer` (Console):** Type `window.dataLayer.filter(e => e[0] === 'consent' && e[1] === 'default')` or inspect the latest relevant consent events.
        *   **Expected:** The following consent keys should all be in a `denied` state:
            *   `analytics_storage: 'denied'`
            *   `ad_storage: 'denied'`
            *   `ad_user_data: 'denied'`
            *   `ad_personalization: 'denied'`

## 3. Test Case 2: Accepting Consent

This test verifies the behavior when a user accepts the cookie consent.

1.  **Perform Initial Visit Steps:** Ensure you are starting from a state where the consent banner is visible (Test Case 1).
2.  **Accept Consent:**
    *   Click the "Got it" (or equivalent "Accept") button on the cookie consent banner.
3.  **Verify Observations:**
    *   **Cookie Consent Banner:**
        *   **Expected:** The cookie consent banner should disappear.
    *   **Consent State (Using Consent Mode Debugger or `dataLayer`):**
        *   **Consent Mode Debugger:** Check the updated status.
        *   **`dataLayer` (Console):** Inspect the `dataLayer` for a consent `update` event.
        *   **Expected:** All four consent keys should now be `granted`:
            *   `analytics_storage: 'granted'`
            *   `ad_storage: 'granted'`
            *   `ad_user_data: 'granted'`
            *   `ad_personalization: 'granted'`
    *   **Network Tab (Developer Tools):**
        *   Filter for `gtm.js` or the GTM Container ID from `NEXT_PUBLIC_GTM_ID`.
        *   **Expected:** The Google Tag Manager script should be loaded. The request URL will be `https://www.googletagmanager.com/gtm.js?id=YOUR_GTM_ID` (where `YOUR_GTM_ID` is from `NEXT_PUBLIC_GTM_ID`). This script is loaded via the Next.js `Script` component. Subsequent requests initiated by GTM (e.g., to Google Analytics) may also appear.
    *   **Local Storage (Application/Storage Tab):**
        *   Find `localStorage` for the site.
        *   **Expected:** A key named `cookie_consent_given` (or similar, as defined in `CookieConsentBanner.tsx`) should be present with the value `true`.
    *   **(Optional) Google Analytics Real-Time:**
        *   If you have access to the linked Google Analytics property, check the Real-Time reports.
        *   **Expected:** Pageviews and events (if any are configured to fire on load after consent) should start appearing.

## 4. Test Case 3: Subsequent Visit - Consent Previously Given

This test verifies that the site remembers previously granted consent.

1.  **Perform Consent Acceptance Steps:** Complete Test Case 2 so that consent has been accepted and `localStorage` is set.
2.  **Reload/Navigate:**
    *   Reload the current page.
    *   Alternatively, navigate to another page on the same site and then return to the original page.
3.  **Verify Observations:**
    *   **Cookie Consent Banner:**
        *   **Expected:** The cookie consent banner should *not* reappear.
    *   **Consent State (Using Consent Mode Debugger or `dataLayer`):**
        *   **Expected:** Consent states should remain `granted` for all four keys, reflecting the previously accepted state. This state should be established early, ideally from the `default` consent command if `localStorage` indicated prior consent.
    *   **Network Tab (Developer Tools):**
        *   **Expected:** The GTM script (`gtm.js`) should be loaded (it might be served from the browser cache). The Next.js `Script` component handles script loading, so ensure it's not attempting to load a duplicate if already present and correctly processed.

## 5. Test Case 4: Noscript Functionality

This test verifies the GTM noscript fallback for users with JavaScript disabled.

1.  **Disable JavaScript:**
    *   **Chrome:** Open Developer Tools -> Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the Command Menu -> Type "Disable JavaScript" and select it.
    *   **Firefox:** Type `about:config` in the address bar, search for `javascript.enabled`, and toggle it to `false`. Remember to re-enable it after the test.
2.  **Clear Site Data:**
    *   Follow the steps in Test Case 1 (Step 1) to clear all site data. This is important because `localStorage` (set by JS) should not influence this test.
3.  **Reload the Application:**
    *   With JavaScript still disabled, reload the page.
4.  **Verify Observations:**
    *   **Cookie Consent Banner:**
        *   **Expected:** The cookie consent banner (which relies on JavaScript) should *not* be visible or functional.
    *   **Network Tab (Developer Tools):**
        *   Filter for `gtm.js`.
        *   **Expected:** The main GTM script (`gtm.js`) should *not* load, as its injection relies on JavaScript (via `next/script` which also needs JS).
    *   **HTML Source / DOM Inspection:**
        *   Right-click on the page and select "View Page Source" or inspect the DOM using Developer Tools (Elements tab).
        *   Search for `<noscript>`.
        *   **Expected:** The GTM `<noscript>` tag should be present in the HTML. It will look like:
            ```html
            <noscript>
              <iframe src="https://www.googletagmanager.com/ns.html?id=YOUR_GTM_ID"
                      height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe>
            </noscript>
            ```
            Verify that the `src` attribute correctly points to your GTM container ID (this ID comes from the `NEXT_PUBLIC_GTM_ID` environment variable).
    *   **Important Note for Tester:** This test primarily verifies the *presence* of the GTM `<noscript>` tag. With JavaScript disabled, the client-side consent banner and its logic (`gtag` calls) will not function. The GTM noscript tag will therefore load GTM in a default (likely 'denied') consent state. This is expected behavior for users browsing with JavaScript disabled.
5.  **Re-enable JavaScript:** Don't forget to re-enable JavaScript in your browser after completing this test case.

## 6. Test Case 5: (Future Consideration) Declining Consent

This is a placeholder for when/if functionality to decline consent or manage granular consent choices is implemented.

*   **If "Decline" functionality is added:**
    *   Perform tests similar to "Accepting Consent" but by clicking "Decline."
    *   **Expected:** Consent states should remain `denied` (or be set to `denied` if they were previously `granted`). No GTM script loading or related tracking should occur. `localStorage` might store this declined choice.
*   **If granular consent options are added:**
    *   Test various combinations of granted/denied states for the four consent keys.
    *   **Expected:** GTM and associated tags should respect the specific consent choices made by the user. For example, if `analytics_storage` is `denied` but `ad_storage` is `granted`, analytics tags should not fire, but ad-related tags might (depending on their configuration in GTM).

Thoroughly document any deviations from the expected behavior for each test case.
