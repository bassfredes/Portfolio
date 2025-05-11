"use client";
import React from "react";

interface StackCardProps {
  category: string;
  technologies: string[];
}

const StackCard: React.FC<StackCardProps> = ({ category, technologies }) => (
  <div>
    <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{category}</h4>
    <ul className="list-disc list-inside ml-6 space-y-1 text-gray-700 dark:text-slate-200">
      {technologies.map((t, idx) => (
        <li key={idx}>{t}</li>
      ))}
    </ul>
  </div>
);

export default StackCard;
