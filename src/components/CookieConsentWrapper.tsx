'use client';

import dynamic from 'next/dynamic';

const DynamicCookieConsentBanner = dynamic(
  () => import('@/components/CookieConsentBanner'),
  { ssr: false }
);

export default function CookieConsentWrapper() {
  return <DynamicCookieConsentBanner />;
}
