import AnalyticsScript from "@/components/AnalyticsScript";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";
import GTMNoScript from "@/components/GTMNoScript";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Bastian Fredes - Solution Architect, Technical Lead, and Web Developer 10+ years of experience - Galway, Ireland.",
  description: "Solution Architect, Technical Lead, and Web Developer",
  openGraph: {
    title: "Bastian Fredes - Portfolio",
    description:
      "Solution Architect, Technical Lead, and Web Developer 10+ years of experience - Galway, Ireland.",
    url: "https://www.bassfredes.dev",
    siteName: "Bastian Fredes - Portfolio",
    images: [
      {
        url: "https://www.bassfredes.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bastian Fredes - Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
                try {
                  window.trustedTypes.createPolicy('default', {
                    createHTML: (string) => string,
                    createScript: (string) => string,
                    createScriptURL: (string) => string,
                  });
                } catch (e) {
                  console.warn('Trusted Types policy "default" could not be created:', e);
                }
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GTMNoScript />
        <AnalyticsScript />
        <AnalyticsProvider />
        <ThemeProvider>{children}</ThemeProvider>
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
