"use client";
import React from "react";

interface CertificationsEducationProps {
  certifications: { name: string; institution: string }[];
  education: { degree: string; institution: string; duration: string }[];
}

const CertificationsEducation: React.FC<CertificationsEducationProps> = ({ certifications, education }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">Certifications & Education</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 dark:text-slate-200">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><span className="text-yellow-400">🏅</span>Certifications</h3>
        <ul className="list-disc list-inside ml-6 space-y-1">
          {certifications.map((cert, index) => (
            <li key={index}>{cert.name} ({cert.institution})</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><span className="dark:text-blue-400 text-blue-600">🎓</span>Education</h3>
        <ul className="list-disc list-inside">
          {education.map((edu, index) => (
            <li key={index}>{edu.degree} from {edu.institution} {edu.duration ? `(${edu.duration})` : ''}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default CertificationsEducation;
