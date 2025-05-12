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
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center rounded-2xl p-0 md:p-0 group bg-transparent w-full">
      <div className="w-full md:w-2/5 flex-shrink-0 flex items-center justify-center">
        <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-[#232946] flex items-center justify-center">
          <Image src={image} alt={title} width={400} height={220} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
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
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-800/70 text-blue-200 font-mono border border-blue-400/30">
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-300 mb-4 text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          {links.code && (
            <a href={links.code} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border border-blue-400 text-blue-400 bg-transparent hover:bg-blue-500 hover:text-white font-semibold transition-colors text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' className='inline-block'><path fill='currentColor' d='M9.4 16.6L4.8 12l4.6-4.6l1.4 1.4L7.6 12l3.2 3.2zm5.2 0l-1.4-1.4L16.4 12l-3.2-3.2l1.4-1.4l4.6 4.6z'/></svg>
              Code
            </a>
          )}
          {links.preview && (
            <a href={links.preview} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border border-green-400 text-green-400 bg-transparent hover:bg-green-500 hover:text-white font-semibold transition-colors text-base hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' className='inline-block'><path fill='currentColor' d='M12 7V3l7 7l-7 7v-4.1C7.6 12.9 5.5 15.5 5.5 15.5c1.5-4.5 6.5-5.5 6.5-5.5Z'/></svg>
              Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
