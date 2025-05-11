"use client";
import React from "react";

interface ExperienceCardProps {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ role, company, duration, responsibilities }) => (
  <div className="mb-6 last:mb-0 p-4 md:p-5 rounded-lg bg-[#181c2a]/80 dark:bg-[#181c2a]/80 transition-shadow duration-300 ease-in-out">
    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{role}</h4>
    <p className="text-md text-gray-600 dark:text-slate-300 mb-3">{company} | {duration}</p>
    <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-slate-200">
      {responsibilities.map((res, idx) => (
        <li key={idx}>{res}</li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard;
