"use client";
import React from "react";
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  links: { code?: string; preview?: string };
  badge?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, links, badge }) => {
  return (
    <div className="relative rounded-2xl shadow-lg p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-6 hover:scale-[1.03] hover:shadow-2xl transition-transform group"
      style={{ background: "var(--section-background)", boxShadow: "0 2px 16px 0 rgba(30,41,59,0.08)" }}>
      {badge && (
        <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-fade-in">
          {badge}
        </span>
      )}
      <div className="flex-shrink-0 w-full md:w-56 h-40 rounded-xl overflow-hidden flex items-center justify-center group-hover:ring-4 group-hover:ring-blue-400/30 transition-all"
        style={{ background: "var(--background)" }}>
        <Image src={image} alt={title} width={224} height={160} className="object-contain w-full h-full" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors" style={{ color: "var(--foreground)" }}>{title}</h4>
          <p className="mb-3" style={{ color: "var(--foreground)" }}>{description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tech.map((t, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--section-border)", color: "var(--foreground)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          {links.code && <a href={links.code} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--foreground)" }}>Code</a>}
          {links.preview && <a href={links.preview} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--foreground)" }}>Preview</a>}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
