"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

interface SocialLinksProps {
  linkedin: string;
  github: string;
  email: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ linkedin, github, email }) => (
  <div className="flex justify-center space-x-8 mt-4">
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="dark:text-blue-500 dark:hover:text-blue-400 text-blue-700 hover:text-blue-600 transition-colors duration-200 text-3xl hover:scale-110"
      aria-label="LinkedIn"
    >
      <FaLinkedin />
    </a>
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-200 hover:text-gray-400 transition-colors duration-200 text-3xl hover:scale-110"
      aria-label="GitHub"
    >
      <FaGithub />
    </a>
    <a
      href={`mailto:${email}`}
      className="text-pink-500 hover:text-pink-400 transition-colors duration-200 text-3xl hover:scale-110"
      aria-label="Email"
    >
      <FaEnvelope />
    </a>
  </div>
);

export default SocialLinks;
