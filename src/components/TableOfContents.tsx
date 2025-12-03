'use client';

import React, { useEffect, useState } from 'react';
import { FaListUl, FaTimes } from 'react-icons/fa';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Buscar el contenedor del artículo para limitar la búsqueda de encabezados
    // Asumimos que el contenido está dentro de un elemento con role="article" o una clase específica
    // En page.tsx vimos que SectionContainer tiene role="article"
    const article = document.querySelector('article') || document.querySelector('.prose');
    
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));
    const headingData = elements.map((elem) => ({
      id: elem.id,
      text: (elem as HTMLElement).innerText,
      level: Number(elem.tagName.substring(1)),
    }));

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Ajuste para el header fijo si existe
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Toggle Table of Contents"
      >
        {isOpen ? <FaTimes size={20} /> : <FaListUl size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Container - Sidebar on Desktop, Drawer on Mobile */}
      <nav
        className={`
          fixed lg:sticky lg:top-32 top-0 right-0 h-full lg:max-h-[calc(100vh-10rem)]
          w-72 lg:w-64 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent
          shadow-2xl lg:shadow-none z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          p-6 lg:p-0 overflow-y-auto
          border-l lg:border-l-0 border-gray-200 dark:border-gray-800
        `}
      >
        <div className="lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-4 lg:pr-2 pb-10">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            On this page
          </h2>
          <ul className="space-y-3 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`transition-all duration-200 ${
                  heading.level === 3 ? 'pl-4' : ''
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block transition-colors duration-200 ${
                    activeId === heading.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium translate-x-1'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default TableOfContents;
