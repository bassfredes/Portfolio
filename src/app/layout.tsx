import AnalyticsScript from "@/components/AnalyticsScript";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bassfredes - Portfolio",
  description: "Solution Architect, Technical Lead, and Web Developer",
  openGraph: {
    title: "Bassfredes - Portfolio",
    description: "Solution Architect, Technical Lead, and Web Developer",
    url: "https://www.bassfredes.dev",
    siteName: "Bassfredes - Portfolio",
    images: [
      {
        url: "https://www.bassfredes.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bassfredes - Portfolio",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsScript />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
