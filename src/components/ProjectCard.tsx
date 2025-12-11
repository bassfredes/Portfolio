"use client";
import Image from "next/image";
import React from "react";
import { FaChartArea, FaExternalLinkAlt, FaGithub, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiGraphql,
  SiNextdotjs,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiDart,
} from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  links: { code?: string; preview?: string };
  badge?: string;
}

// Mapeo de tecnología a icono
const techIcons: Record<string, React.ReactNode> = {
  React: <FaReact className="text-cyan-600 dark:text-cyan-400" title="React" />,
  "Next.js": (
    <SiNextdotjs className="text-black dark:text-white" title="Next.js" />
  ),
  "Tailwind CSS": (
    <SiTailwindcss className="text-sky-600 dark:text-sky-400" title="Tailwind CSS" />
  ),
  TypeScript: <SiTypescript className="text-blue-600 dark:text-blue-500" title="TypeScript" />,
  "Styled Components": (
    <SiStyledcomponents className="text-pink-600 dark:text-pink-400" title="Styled Components" />
  ),
  "Node.js": <FaNodeJs className="text-green-700 dark:text-green-600" title="Node.js" />,
  GraphQL: <SiGraphql className="text-pink-600 dark:text-pink-500" title="GraphQL" />,
  Recharts: <FaChartArea className="text-green-600 dark:text-green-500" title="Rechart" />,
  Flutter: <FaFlutter className="text-blue-500 dark:text-blue-400" title="Flutter" />,
  Dart: <SiDart className="text-blue-500 dark:text-blue-400" title="Dart" />,
  Firebase: <SiFirebase className="text-yellow-500 dark:text-yellow-400" title="Firebase" />,
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  image,
  links,
  badge,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center rounded-2xl p-0 md:p-0 group bg-transparent w-full">
      <div className="w-full md:w-2/5 shrink-0 flex items-center justify-center">
        <div className="relative w-full h-[200px] md:h-[200px] rounded-xl overflow-hidden bg-gray-100 dark:bg-[#232946] flex items-center justify-center border border-gray-200 dark:border-none">
          <Image
            src={image}
            alt={title}
            width={440}
            height={220}
            loading="lazy"
            quality={70}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between h-full w-full md:pr-2">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2 line-clamp-1">
            {title}
            {badge && (
              <span className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white animate-fade-in">
                {badge}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {tech.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800/70 dark:text-blue-200 font-mono dark:border-blue-400/30 shadow-sm dark:shadow-badge-green"
              >
                {techIcons[t] && (
                  <span className="text-base align-middle">{techIcons[t]}</span>
                )}
                <span>{t}</span>
              </span>
            ))}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${title} on GitHub`}
              className="group px-5 py-2 rounded-lg border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 dark:bg-linear-to-tr from-blue-900/60 via-blue-700/30 to-blue-400/10 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white font-semibold transition-all text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 shadow-lg"
            >
              <FaGithub className="text-xl transition-colors" aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
          {links.preview && (
            <a
              href={links.preview}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live preview of ${title}`}
              className="group px-5 py-2 rounded-lg border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 dark:bg-linear-to-tr from-green-900/60 via-green-700/30 to-green-400/10 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white font-semibold transition-all text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center gap-2 shadow-lg"
            >
              <FaExternalLinkAlt className="text-xl transition-colors" aria-hidden="true" />
              <span>Preview</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
