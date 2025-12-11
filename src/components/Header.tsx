"use client";
import React, { useEffect, useState, FC } from "react";
import { useTheme } from "../context/ThemeProvider";
import { FaMoon, FaSun, FaDesktop, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { id: "hero", label: "About", path: "/" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/contact" },
];

type Theme = "light" | "dark" | "system";

const ThemeIcon: FC<{ theme: Theme }> = ({ theme }) => {
  const iconClass = "transition-transform duration-300 dark:text-blue-400 text-blue-400";
  if (theme === "dark")
    return (
      <span className={iconClass} title="Dark mode" aria-label="Dark mode">
        <FaMoon size={18} />
      </span>
    );
  if (theme === "light")
    return (
      <span className={iconClass} title="Light mode" aria-label="Light mode">
        <FaSun size={18} />
      </span>
    );
  // system
  return (
    <span className={iconClass} title="System" aria-label="System">
      <FaDesktop size={18} />
    </span>
  );
};

const Header: FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Toggle body class for mobile menu displacement
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    // If not on home page, just highlight the matching link based on path
    if (pathname !== "/") {
      const currentLink = NAV_LINKS.find((link) => link.path === pathname || (pathname.startsWith(link.path) && link.path !== "/"));
      setActiveSection(currentLink ? currentLink.id : "");
      return;
    }

    // If on home page, use IntersectionObserver to highlight sections as we scroll
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Active zone is near the top
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string, path: string) => {
    if (!pathname) return; // Protección contra null
    
    setIsMobileMenuOpen(false);

    const isSectionRoute = ["/", "/about", "/projects", "/contact", "/experience"].includes(pathname);
    if (isSectionRoute && pathname !== path) {
      window.history.replaceState(null, "", path);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (pathname === path) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <div id="scroll-sentinel" className="absolute top-0 left-0 w-full h-2.5 pointer-events-none opacity-0 z-[-10]" />
      <div
        className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
        dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(15,17,27,0))]"
      ></div>
      <header 
        className="fixed top-0 left-0 w-full z-50 flex justify-end md:justify-center items-start pointer-events-none pr-4 md:pr-0 transition-transform duration-300 ease-in-out"
        style={{ transform: isMobileMenuOpen ? "translateX(calc(-1 * min(75vw, 24rem)))" : "translateX(0)" }}
      >
        <div
          className={`transition-all duration-300 mt-4 ${
            hasScrolled && !isMobileMenuOpen
              ? "bg-[#181c2a]/90 shadow-lg border border-gray-800 dark:bg-[#181c2a]/90 dark:border-gray-800"
              : isMobileMenuOpen 
                ? "bg-transparent border-transparent shadow-none"
                : "bg-white/90 border border-slate-200 dark:bg-[#181c2a]/80 dark:border-gray-800"
          } rounded-full px-6 py-2 flex items-center pointer-events-auto backdrop-blur-md`}
          style={{ minHeight: "40px", maxWidth: "fit-content" }}
        >
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-4 text-xs md:text-sm font-semibold">
            {NAV_LINKS.map(({ id, label, path }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id, path)}
                className={`px-1 md:px-2 transition-colors duration-200 focus:outline-none cursor-pointer
                  ${
                    hasScrolled
                      ? activeSection === id
                        ? "font-semibold text-blue-400 dark:text-blue-400"
                        : "text-white dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                      : activeSection === id
                      ? "font-semibold text-blue-400 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                  } relative`}
                aria-current={activeSection === id ? "page" : undefined}
                tabIndex={0}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : theme === "light"
                    ? "system"
                    : "dark"
                )
              }
              className={`ml-2 transition-all duration-200 focus:outline-none cursor-pointer
                ${
                  hasScrolled
                    ? "text-gray-900 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                }`}
              aria-label="Change theme"
              title="Change theme"
              tabIndex={0}
            >
              <ThemeIcon theme={theme} />
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-x-4">
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : theme === "light"
                    ? "system"
                    : "dark"
                )
              }
              className={`transition-all duration-200 focus:outline-none cursor-pointer ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
                ${
                  hasScrolled
                    ? "text-gray-900 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                }`}
              aria-label="Change theme"
            >
              <ThemeIcon theme={theme} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-300 focus:outline-none cursor-pointer z-50
                ${
                  hasScrolled && !isMobileMenuOpen
                    ? "text-gray-900 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                    : isMobileMenuOpen
                      ? "text-gray-900 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 rotate-90"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-400 dark:hover:text-white"
                }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-[100dvh] w-[75vw] max-w-sm bg-white dark:bg-[#0f111a] shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full p-6 pt-20">
          
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map(({ id, label, path }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id, path)}
                className={`text-lg font-medium text-left transition-colors duration-200
                  ${
                    activeSection === id
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
