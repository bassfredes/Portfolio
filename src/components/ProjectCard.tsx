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
  React: <FaReact className="text-cyan-400" title="React" />,
  "Next.js": (
    <SiNextdotjs className="text-black dark:text-white" title="Next.js" />
  ),
  "Tailwind CSS": (
    <SiTailwindcss className="text-sky-400" title="Tailwind CSS" />
  ),
  TypeScript: <SiTypescript className="text-blue-500" title="TypeScript" />,
  "Styled Components": (
    <SiStyledcomponents className="text-pink-400" title="Styled Components" />
  ),
  "Node.js": <FaNodeJs className="text-green-600" title="Node.js" />,
  GraphQL: <SiGraphql className="text-pink-500" title="GraphQL" />,
  Recharts: <FaChartArea className="text-green-500" title="Rechart" />,
  Flutter: <FaFlutter className="text-blue-400" title="Flutter" />,
  Dart: <SiDart className="text-blue-400" title="Dart" />,
  Firebase: <SiFirebase className="text-yellow-400" title="Firebase" />,
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
      <div className="w-full md:w-2/5 flex-shrink-0 flex items-center justify-center">
        <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-[#232946] flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            loading="lazy"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between h-full w-full md:pr-2">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
            {title}
            {badge && (
              <span className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-fade-in">
                {badge}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {tech.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-800/70 text-blue-200 font-mono border border-blue-400/30 shadow-badge-green"
              >
                {techIcons[t] && (
                  <span className="text-base align-middle">{techIcons[t]}</span>
                )}
                <span>{t}</span>
              </span>
            ))}
          </div>
          <p className="text-gray-300 mb-4 text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-5 py-2 rounded-lg border-2 border-blue-400 text-blue-400 bg-gradient-to-tr from-blue-900/60 via-blue-700/30 to-blue-400/10 hover:bg-blue-500 hover:text-white font-semibold transition-all text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 shadow-lg"
            >
              <FaGithub className="text-xl transition-colors" />
              <span>Code</span>
            </a>
          )}
          {links.preview && (
            <a
              href={links.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-5 py-2 rounded-lg border-2 border-green-400 text-green-400 bg-gradient-to-tr from-green-900/60 via-green-700/30 to-green-400/10 hover:bg-green-500 hover:text-white font-semibold transition-all text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center gap-2 shadow-lg"
            >
              <FaExternalLinkAlt className="text-xl transition-colors" />
              <span>Preview</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
