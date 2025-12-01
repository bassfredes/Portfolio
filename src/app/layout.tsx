import AnalyticsScript from "@/components/AnalyticsScript";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";
import GTMNoScript from "@/components/GTMNoScript";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "highlight.js/styles/github-dark.css";
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
