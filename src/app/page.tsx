import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ContactScrollButton from "@/components/ContactScrollButton";

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
  summary:
    "I'm a passionate architect and developer with over 10 years of experience building scalable, maintainable, and delightful digital products. I love collaborating, mentoring, and learning new things every day. My mission is to create solutions that empower people and businesses. When I&apos;m not coding, you&apos;ll find me exploring new tech, reading, or enjoying the outdoors in Galway, Ireland.",
  coreHighlights: [
    "Led architecture for complex Vtex IO integrations (payments, Icecat, ERP sync) across LATAM and EU markets.",
    "Tech Lead for distributed teams across frontend and backend domains (React, Node.js, Python).",
    "Delivered scalable cloud-native solutions with CI/CD, GitHub Actions, Docker, RESTful APIs.",
    "Integrated multi-merchant payment flows using SeQura, Cybersource, Adyen.",
    "Strong communicator in bilingual environments (English / Spanish), comfortable in client-facing roles.",
    "Certified in Vtex IO development; experienced with Agile/Scrum and stakeholder alignment.",
  ],
  experience: [
    {
      role: "Solution Architect / Tech Leader",
      company: "Digital eCommerce Agency",
      duration: "2020 – Present",
      responsibilities: [
        "Designed and implemented full-stack architectures for eCommerce clients on Vtex IO platform.",
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
    { name: "Vtex IO Certified Developer", institution: "EICOM" },
  ] as Certification[],
  education: [
    {
      degree: "Bachelor’s in Computer Engineering",
      institution: "University of Andres Bello",
      duration: "",
    },
  ] as Education[],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/bassfredes/",
    github: "https://github.com/bassfredes",
    email: "me@bassfredes.dev",
    phone: "+353 8308 898 60",
    portfolio: "https://www.bassfredes.dev",
  },
  keywords: [
    "Solution Architect",
    "Fullstack Developer",
    "Tech Lead",
    "eCommerce",
    "Vtex IO",
    "React",
    "Node.js",
    "GraphQL",
    "Cloud-native architectures",
    "CI/CD",
    "GitHub Actions",
    "Docker",
    "RESTful APIs",
    "Payment gateways",
    "TypeScript",
    "Tailwind",
    "Styled Components",
    "Express",
    "Firebase",
    "Icecat",
    "Vtex MasterData",
    "Cybersource",
    "SeQura",
    "AWS",
    "S3",
    "Lambda",
    "Google Cloud",
    "SQL",
    "Excel automation",
    "pandas",
    "multithreaded data pipelines",
    "Agile",
    "Scrum",
    "Stakeholder alignment",
    "Clean code",
    "DX",
  ],
};

// Agregar badge "Featured" a los proyectos destacados
const projects = [
  {
    title: "SVGL – A beautiful library with SVG logos",
    description:
      "SVG logo library of the most popular brands. 100+ logos in one month. 24+ SVGs downloaded. Built from scratch with NextJS, React, and Tailwind CSS.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    image: "/vercel.svg",
    links: {
      code: "https://github.com/bassfredes/svgl",
      preview: "https://svgl.dev",
    },
    badge: "Featured",
  },
  {
    title: "AdventJS – JavaScript and TypeScript Coding Challenges",
    description:
      "Free platform with coding challenges. Over 1 million views in one month. 50+ challenges completed. Built from scratch with NextJS, React, and Tailwind CSS.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    image: "/globe.svg",
    links: {
      code: "https://github.com/bassfredes/adventjs",
      preview: "https://adventjs.dev",
    },
    badge: "Featured",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center w-full min-h-screen px-4 pt-20">
        {/* HERO / PRESENTACIÓN */}
        <SectionContainer
          id="hero"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          ariaLabel="Hero section"
          role="region"
        >
          <div className="flex flex-col items-center gap-6 mb-8 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
              <div className="flex-shrink-0 flex flex-col items-center">
                <Image
                  src="/me.jpg"
                  alt="Bastian Fredes profile"
                  width={112}
                  height={112}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-blue-400/40 shadow-xl border-4 border-[#232946] bg-[#232946]"
                  priority
                />
              </div>
              <div className="flex flex-col items-center sm:items-start w-full">
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition md:justify-center md:hover:scale-105 mb-4"
                >
                  <div className="flex items-center">
                    <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#51E4B8_0%,#21554E_50%,#51E4B8_100%)]"></span>
                      <div className="inline-flex items-center justify-center w-full px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-white/80 backdrop-blur-3xl whitespace-nowrap">
                        Available for work
                      </div>
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight m-0 p-0 text-left drop-shadow-lg">
                Hey, I&apos;m <span className="text-yellow-400">Bastian</span>
              </h1>
              <span className="text-sm text-gray-400 font-mono mt-2 mb-4 text-left">
                Galway, Ireland
              </span>
              <p className="text-lg md:text-2xl text-gray-200 mb-2 max-w-2xl text-left font-medium">
                10+ years of experience.{" "}
                <span className="text-yellow-400 font-bold">
                  Solution Architect &amp; Tech Lead
                </span>
                <br />
                Specialized in building unique, high-performance webs.
              </p>
              <div className="flex flex-wrap gap-3 mt-2 justify-left w-full">
                <ContactScrollButton />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* EXPERIENCIA */}
        <SectionContainer
          id="experience"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Experience"
          ariaLabel="Work experience"
          role="region"
        >
          <SectionTitle className="text-2xl font-bold flex items-center gap-2 mb-10">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-yellow-400">Experience</span>
          </SectionTitle>
          <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-10 md:gap-x-16">
            {/* Línea de tiempo continua, visible en mobile y desktop, ahora en gris */}
            <div className="absolute left-6 md:left-4 top-0 bottom-0 w-0.5 bg-gray-500/60 rounded-full z-0" style={{ minHeight: '100%' }}></div>
            {profile.experience.map((exp, idx) => (
              <React.Fragment key={idx}>
                {/* Columna izquierda: timeline y datos */}
                <div className="relative md:col-span-5 flex flex-col mb-4 md:mb-0 z-10">
                  {/* Punto perfectamente centrado sobre la línea */}
                  <div className="flex flex-col items-start pl-14 md:pl-12 sm:pl-10 w-full relative">
                    <span className="absolute top-2 left-6 md:left-4 w-4 h-4 bg-yellow-400 rounded-full border-4 border-gray-500/60 shadow-md z-10" style={{ transform: 'translateX(-50%)' }}></span>
                    <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold mb-0.5 leading-tight text-yellow-400">
                      {exp.role}
                    </h4>
                    <div className="text-base md:text-lg text-white font-semibold mb-0.5">{exp.company}</div>
                    <div className="text-xs md:text-sm text-gray-400 mb-2">{exp.duration}</div>
                  </div>
                </div>
                {/* Columna derecha: responsabilidades */}
                <div className="md:col-span-7 flex flex-col justify-center h-full gap-2">
                  <ul className="list-none text-gray-300 leading-relaxed text-base md:text-lg">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="mb-2 last:mb-0">{res}</li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </div>
        </SectionContainer>

        {/* PROYECTOS */}
        <SectionContainer
          id="projects"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Projects"
          ariaLabel="Projects"
          role="region"
        >
          <SectionTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="text-white">Projects</span>
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </SectionContainer>

        {/* SOBRE MÍ */}
        <SectionContainer
          id="about"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="About me"
          ariaLabel="About me"
          role="region"
        >
          <SectionTitle className="text-2xl font-bold flex items-center gap-2 mb-8">
            <span className="text-white">About me</span>
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                {profile.summary}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/me.jpg"
                alt="Bastian Fredes profile"
                width={180}
                height={180}
                className="rounded-xl ring-1 ring-gray-700 object-cover w-40 h-40 md:w-44 md:h-44"
                priority
              />
            </div>
          </div>
        </SectionContainer>

        {/* CONTACTO */}
        <SectionContainer
          id="contact"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-24 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Contact"
          ariaLabel="Contact"
          role="region"
        >
          <SectionTitle className="mb-6 text-blue-400 flex items-center gap-2 text-lg md:text-xl">
            <span>Contact</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </SectionTitle>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold mb-2 text-white">
                Let&apos;s work together!
              </h4>
              <p className="text-base md:text-lg text-slate-300 mb-4">
                I&apos;m open to new opportunities, collaborations, and
                freelance projects. You can contact me using the form or
                directly by email.
              </p>
              <div className="flex justify-center md:justify-start gap-2 mb-4">
                <a
                  href="mailto:me@bassfredes.dev"
                  className="text-red-400 hover:scale-110 transition-transform"
                  aria-label="Email"
                >
                  <FaEnvelope size={16} className="drop-shadow-sm" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bassfredes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:scale-110 transition-transform"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} className="drop-shadow-sm" />
                </a>
                <a
                  href="https://github.com/bassfredes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:scale-110 transition-transform"
                  aria-label="GitHub"
                >
                  <FaGithub size={16} className="drop-shadow-sm" />
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
