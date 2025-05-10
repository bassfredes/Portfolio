import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

// Define types for the data
interface Experience {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface Certification {
  name: string;
  institution: string;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
}

const profile = {
  name: "Bastian Fredes",
  title: "Solution Architect | Tech Lead | Frontend Developer.",
  location: "Galway, Ireland",
  summary: "Solution Architect with over 10 years of experience in fullstack development, team leadership, and technical strategy. Specialized in eCommerce ecosystems, cloud-native architectures, and high-performance frontend/backend integrations. Hands-on expertise in VTEX IO, React, Node.js, and GraphQL. Adept at translating complex business requirements into scalable, maintainable solutions. Passionate about clean code, DX, and modern development practices.",
  coreHighlights: [
    "Led architecture for complex VTEX IO integrations (payments, Icecat, ERP sync) across LATAM and EU markets.",
    "Tech Lead for distributed teams across frontend and backend domains (React, Node.js, Python).",
    "Delivered scalable cloud-native solutions with CI/CD, GitHub Actions, Docker, RESTful APIs.",
    "Integrated multi-merchant payment flows using SeQura, Cybersource, Adyen.",
    "Strong communicator in bilingual environments (English / Spanish), comfortable in client-facing roles.",
    "Certified in VTEX IO development; experienced with Agile/Scrum and stakeholder alignment."
  ],
  experience: [
    {
      role: "Solution Architect / Tech Leader",
      company: "Digital eCommerce Agency",
      duration: "2020 – Present",
      responsibilities: [
        "Designed and implemented full-stack architectures for eCommerce clients on VTEX IO platform.",
        "Oversaw large-scale integrations: PIM for product data, ERP for SKU sync, third-party logistics.",
        "Supported teams with DevOps practices: API authentication, cold-start mitigation, S3 security.",
        "Advised clients on technical feasibility, performance, and long-term scalability.",
        "Led post-go-live technical ownership and continuous improvement efforts.",
      ],
    },
    {
      role: "Senior Frontend Developer",
      company: "Various clients",
      duration: "2015 – 2020",
      responsibilities: [
        "Managed technical delivery of React and Node.js applications.",
        "Mentored junior developers, introduced code review pipelines and performance metrics.",
        "Architected custom integrations with third-party services (CRMs, payment gateways).",
        "Created internal tools in Python for automation of catalog, shipping, and policy rules.",
      ],
    },
  ] as Experience[],
  technicalStack: [
    "Frontend: React, TypeScript, Tailwind, Styled Components, Vtex IO",
    "Backend: Node.js, Express, GraphQL, Python, Firebase",
    "Integrations: REST APIs, Icecat, Vtex, Cybersource, SeQura, Adyen",
    "Cloud: AWS, Google Cloud",
    "DevOps: GitHub Actions, Docker, AWS (S3, Lambda), Google Cloud",
    "Other: SQL, Excel automation, pandas, multithreaded data pipelines",
  ],
  certifications: [
    { name: "VTEX IO Certified Developer", institution: "EICOM" }, // Institution not provided in the text
  ] as Certification[],
  education: [
    { degree: "Bachelor’s in Computer Engineering", institution: "University of Andres Bello", duration: "" }, // Duration not provided
  ] as Education[],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/bassfredes/", // Placeholder from provided text
    github: "https://github.com/bassfredes",     // Placeholder from provided text
    email: "me@bassfredes.dev",       // Placeholder from provided text
    phone: "+353 8308 898 60",       // Placeholder from provided text
    portfolio: "https://www.bassfredes.dev" // Placeholder from provided text
  },
  // Added for clarity based on the text
  keywords: [
    "Solution Architect", "Fullstack Developer", "Tech Lead", "eCommerce", "VTEX IO", "React", "Node.js", "GraphQL",
    "Cloud-native architectures", "CI/CD", "GitHub Actions", "Docker", "RESTful APIs", "Payment gateways",
    "TypeScript",
    "Tailwind", "Styled Components", "Express", "Firebase", "Icecat", "VTEX MasterData", "Cybersource",
    "SeQura", "AWS", "S3", "Lambda", "Google Cloud", "SQL", "Excel automation", "pandas",
    "multithreaded data pipelines", "Agile", "Scrum", "Stakeholder alignment", "Clean code", "DX"
  ],
};



export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">{profile.name}</h1>
        <h2 className="text-lg md:text-xl text-gray-700 mb-3">{profile.title}</h2>
        <p className="text-md text-gray-600 mb-6">{profile.location}</p>
        <div className="flex justify-center space-x-6">
          <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
          <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600"><FaGithub size={24} /></a>
          <a href={profile.socialLinks.email} className="text-red-600 hover:text-red-800"><FaEnvelope size={24} /></a>
        </div>
      </section>

      {/* Summary Section */}
      <section className="mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Professional Summary</h3>
        <p className="text-lg text-gray-700 leading-relaxed">{profile.summary}</p>
      </section>

      {/* Core Highlights */}
      <section className="mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Core Highlights</h3>
        <ul className="list-disc list-inside ml-6 text-lg text-gray-700 space-y-2">
          {profile.coreHighlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Experience</h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-6 last:mb-0 p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
            <h4 className="text-xl font-bold text-gray-800 mb-1">{exp.role}</h4>
            <p className="text-md text-gray-600 mb-3">{exp.company} | {exp.duration}</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {exp.responsibilities.map((res, resIndex) => (
                <li key={resIndex}>{res}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Technical Stack Section */}
      <section className="mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Technical Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
          {profile.technicalStack.map((tech, index) => (
            <div key={index}>
              {/* Split the string to get the category and the list of technologies */}
              {(() => {
                const parts = tech.split(': ');
                const category = parts[0];
                const technologies = parts[1].split(', ');
                return (
                  <>
                    <h4 className="text-xl font-bold mb-2 text-gray-800">{category}</h4>
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      {technologies.map((t, tIndex) => (
                        <li key={tIndex}>{t}</li>
                      ))}
                    </ul>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </section>
      {/* Certifications and Education Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Certifications & Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h4 className="text-xl font-bold mb-2">Certifications</h4>
            <ul className="list-disc list-inside ml-6 space-y-1">
              {profile.certifications.map((cert, index) => (
                <li key={index}>{cert.name} ({cert.institution})</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 ">Education</h4>
            <ul className="list-disc list-inside text-gray-700">
              {profile.education.map((edu, index) => (
                <li key={index}>{edu.degree} from {edu.institution} {edu.duration ? `(${edu.duration})` : ''}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
