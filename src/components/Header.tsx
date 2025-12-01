"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { id: "hero", label: "About", path: "/" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "blog", label: "Blog", path: "/blog" },
  { id: "contact", label: "Contact", path: "/contact" },
];

type Theme = "light" | "dark" | "system";

const ThemeIcon: React.FC<{ theme: Theme }> = ({ theme }) => {
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

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (!pathname) {
        setActiveSection("");
        return;
      }
      const isMainPage = NAV_LINKS.some(
        (link) =>
          link.path === pathname ||
          (link.path === "/" && pathname.startsWith("/") && !NAV_LINKS.find((l) => l.path !== "/" && pathname.startsWith(l.path)))
      );
      if (!isMainPage && pathname !== "/") {
        setActiveSection("");
        return;
      }

      const offsets = NAV_LINKS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        // Ajustar el top para que la sección se active un poco antes de llegar al borde superior exacto
        return { id, top: Math.abs(rect.top - 80) }; // 80px es un offset de ejemplo, ajustar según altura del header
      });

      const visibleSections = offsets.filter((section) => {
        const el = document.getElementById(section.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 80; // 80px es un offset de ejemplo
      });

      if (visibleSections.length > 0) {
        // De las secciones visibles, encontrar la más cercana al top (o la primera si hay varias)
        const closest = visibleSections.reduce((a, b) => (a.top < b.top ? a : b));
        setActiveSection(closest.id);
      } else {
        // Si estamos en la página principal y no hay secciones visibles (ej. al final del scroll),
        // intentar mantener la última sección activa o limpiar si es necesario.
        // Opcionalmente, si se scrollea muy abajo y ninguna sección está "visible", limpiar activeSection.
        // setActiveSection(""); // Descomentar si se prefiere limpiar
      }
    };

    if (pathname) {
      const currentLink = NAV_LINKS.find((link) => link.path === pathname || (pathname.startsWith(link.path) && link.path !== "/"));
      if (currentLink) {
        setActiveSection(currentLink.id);
      } else {
        setActiveSection("");
      }
    } else {
      setActiveSection("");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Llamar una vez para establecer el estado inicial correctamente tras cualquier cambio de ruta
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Añadir pathname como dependencia

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string, path: string) => {
    if (!pathname) return; // Protección contra null
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
      <div
        className="absolute top-0 bottom-0 z-[-2] min-h-screen w-full
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0.9))]
        dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(15,17,27,0))]"
      ></div>
      <header className="fixed top-0 left-0 w-full z-40 flex justify-center items-start pointer-events-none">
        <div
          className={`transition-all duration-300 mt-4 ${
            hasScrolled
              ? "bg-[#181c2a]/90 shadow-lg border border-gray-800 dark:bg-[#181c2a]/90 dark:border-gray-800"
              : "bg-white/90 border border-slate-200 dark:bg-[#181c2a]/80 dark:border-gray-800"
          } rounded-full px-6 py-2 flex items-center pointer-events-auto backdrop-blur-md`}
          style={{ minHeight: "40px", maxWidth: "fit-content" }}
        >
          <nav className="flex items-center gap-x-4 text-xs md:text-sm font-semibold">
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
        </div>
      </header>
    </>
  );
};

export default Header;
