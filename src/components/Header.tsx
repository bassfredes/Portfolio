"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { id: "hero", label: "About", path: "/" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "contact", label: "Contact", path: "/contact" },
];

type Theme = "light" | "dark" | "system";

const ThemeIcon: React.FC<{ theme: Theme }> = ({ theme }) => {
  const iconClass = "transition-transform duration-300 dark:text-blue-400 text-blue-600";
  
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

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>(NAV_LINKS[0].id);
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Detectar sección activa
      const offsets = NAV_LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navegación SPA con rutas limpias y scroll a sección
  const handleNavClick = (id: string, path: string) => {
    // Si ya estoy en una ruta de sección (ej: /about, /projects, /contact, /experience, /)
    // y hago click en otra sección, solo cambiar la url y hacer scroll, sin refrescar/transicionar
    const isSectionRoute = ["/", "/about", "/projects", "/contact", "/experience"].includes(pathname);
    if (isSectionRoute && pathname !== path) {
      window.history.replaceState(null, "", path);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (pathname === path) {
      // Si hago click en la misma sección, solo scroll
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Si vengo de otra página (no una sección), navega normalmente
      router.push(path);
      // El scroll se hará en el useEffect de la página
    }
  };
  
  return (
    <>
      <div
        className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
        dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(15,17,27,0))]"
      ></div>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-center items-start pointer-events-none">
        <div
          className={`transition-all duration-300 mt-4 ${
            hasScrolled
              ? "bg-[#181c2a]/90 shadow-lg border border-gray-800"
              : "bg-transparent border-transparent"
          } rounded-full px-6 py-2 flex items-center pointer-events-auto backdrop-blur-md`}
          style={{ minHeight: "40px", maxWidth: "fit-content" }}
        >
          <nav className="flex items-center gap-x-4 text-xs md:text-sm font-semibold">
            {NAV_LINKS.map(({ id, label, path }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id, path)}
                className={`px-1 md:px-2 transition-colors duration-200 focus:outline-none hover:text-white relative
                  ${activeSection === id ? "font-semibold text-blue-400" : "text-gray-200"}
                `}
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
              className="text-gray-200 hover:text-white transition-all duration-200 focus:outline-none ml-2"
              aria-label="Change theme"
              title="Change theme"
              tabIndex={0}
            >
              <ThemeIcon theme={theme} />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
