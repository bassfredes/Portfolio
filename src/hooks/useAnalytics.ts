"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Google Analytics measurement ID (replace with your own)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function pageview(url: string) {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    pageview(pathname);
  }, [pathname]);
};

export default useAnalytics;
