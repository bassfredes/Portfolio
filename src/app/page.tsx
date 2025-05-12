import ContactScrollButton from "@/components/ContactScrollButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import SectionContainer from "@/components/SectionContainer";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import SectionScrollHandler from "@/components/SectionScrollHandler";
import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ContactFormClientWrapper from "@/components/ContactFormClientWrapper";
import ContactInfoObfuscated from "@/components/ContactInfoObfuscated";

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
    "Able to communicate in bilingual environments (English/Spanish) and comfortable in client-facing roles.",
    "Certified in Vtex IO development; experienced with Agile/Scrum and stakeholder alignment.",
  ],
  experience: [
    {
      role: "Solution Architect / Tech Leader",
      company: "Corebiz/WPP/VML - Digital eCommerce Agency",
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
      company: "Mitocondria - Digital Agency",
      duration: "2014 – 2020",
      responsibilities: [
        "Managed technical delivery of React and Node.js applications.",
        "Mentored junior developers, introduced code review pipelines and performance metrics.",
        "Architected custom integrations with third-party services (CRMs, payment gateways).",
        "Created internal tools in Python for automation of catalog, shipping, and policy rules.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Various clients",
      duration: "2006 – 2014",
      responsibilities: [
        "Began building websites as a hobby in high school for personal projects.",
        "Developed and maintained web applications using HTML, CSS, JavaScript, and PHP.",
        "Freelanced while studying, gaining experience with various technologies and frameworks.",
        "Created Arduino and Raspberry Pi projects for IoT and automation.",
        "Started freelancing as a developer, building websites and applications for local businesses.",
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

const projects = [
  {
    title: "E-Commerce Insights Dashboard",
    description:
      "An interactive dashboard displaying key e-commerce KPIs (revenue, average order value, orders, sessions) with period comparisons, performance in real time.",
    tech: ["Next.js", "React", "Tailwind CSS", "Recharts"],
    image: "/dashboard.jpg",
    links: {
      code: "https://github.com/bassfredes/eCommerceDashboard",
      preview: "https://dashboard.bassfredes.dev",
    },
    badge: "Featured",
  },
  {
    title: "SplitUp - Smart Expense Sharing App",
    description:
      "A minimalistic mobile app for managing and splitting group expenses in real time, with automated balance tracking, settlements, and analytics.",
    tech: ["Firebase", "Flutter", "Dart"],
    image: "/splitup.jpg",
    links: {
      code: "https://github.com/bassfredes/SplitUp",
      preview: "https://splitup.bassfredes.dev",
    },
    badge: "Featured",
  },
  {
    title: "Privilege – eCommerce + Payments Integration",
    description:
      "A secure, scalable online fashion retail platform integrated with an private branded, offering flexible installments payments. Driving 19.7 % uplift in revenue.",
    tech: ["React", "GraphQL", "Node.js"],
    image: "/privilege.jpg",
    links: {
      code: "https://github.com/bassfredes/Privilege",
      preview: "https://www.privilege.cl",
    },
  },
];

export default function Home() {
  return (
    <>
      <SectionScrollHandler />
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
                <div className="relative group">
                  <span className="absolute -inset-2 z-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-400 blur opacity-60 animate-blob-move"></span>
                  <Image
                    src="/me.jpg"
                    alt="Bastian Fredes profile"
                    width={112}
                    height={112}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-blue-400/40 shadow-xl border-4 border-[#232946] bg-[#232946] relative z-10 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500"
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 96px, 112px"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start w-full">
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition md:justify-center md:hover:scale-105 mb-4"
                >
                  <div className="flex items-center">
                    <span className="relative inline-flex overflow-hidden rounded-full p-[1px] animate-gradient-x">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#51E4B8_0%,#21554E_50%,#51E4B8_100%)]"></span>
                      <div className="inline-flex items-center justify-center w-full px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-white/80 backdrop-blur-3xl whitespace-nowrap">
                        Open to work
                      </div>
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight m-0 p-0 text-left drop-shadow-lg animate-slide-in-down">
                Hey, I&apos;m <span className="text-blue-700 dark:text-yellow-400">Bastian</span>
              </h1>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-2 mb-4 text-left animate-fade-in-delay">
                Galway, Ireland
              </span>
              <p className="text-lg md:text-2xl text-gray-900 dark:text-gray-200 mb-2 max-w-2xl text-left font-medium animate-fade-in-delay2">
                10+ years of experience. <br className="inline md:hidden" />
                <span className="text-blue-800 dark:text-yellow-400 font-bold">
                  Solution Architect &amp; Tech Lead
                </span>
                <br />
                Specialized in building unique, high-performance webs.
              </p>
              <div className="flex flex-wrap gap-3 mt-2 justify-left w-full animate-fade-in-delay3">
                <ContactScrollButton />
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* EXPERIENCIA */}
        <SectionContainer
          id="experience"
          className="w-full lg:max-w-4xl md:max-w-2xl mx-auto text-left py-20 md:py-28 animate-slide-in-up mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Experience"
          ariaLabel="Work experience"
          role="region"
        >
          <SectionTitle className="text-2xl font-bold flex items-center gap-2 mb-10">
            <span className="w-2 h-2 bg-blue-700 dark:bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-gray-900 dark:text-white">Experience</span>
          </SectionTitle>
          <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-y-0 md:gap-y-16 gap-x-10 md:gap-x-16">
            {/* Línea de tiempo continua, visible en mobile y desktop, ahora en gris */}
            <div
              className="absolute left-2 md:left-4 top-0 bottom-0 w-1 bg-gray-500/60 rounded-full z-0"
              style={{ minHeight: "100%" }}
            ></div>
            {profile.experience.map((exp, idx) => (
              <React.Fragment key={idx}>
                {/* Columna izquierda: timeline y datos */}
                <div className="relative md:col-span-5 flex flex-col pl-8 md:pl-12">
                  {/* Punto perfectamente centrado sobre la línea */}
                  <span
                    className="absolute top-2 left-2 md:left-4 w-4 h-4 bg-yellow-400 rounded-full border-4 border-gray-500/60 shadow-md z-10"
                    style={{ transform: "translateX(-35%)" }}
                  ></span>
                  <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold mb-0.5 leading-tight text-blue-700 dark:text-yellow-400">
                    {exp.role}
                  </h4>
                  <div className="text-base md:text-lg text-gray-900 dark:text-white font-semibold mb-0.5">
                    {exp.company}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {exp.duration}
                  </div>
                </div>
                {/* Columna derecha: responsabilidades */}
                <div className="md:col-span-7 flex flex-col justify-start md:justify-center h-full gap-2 pl-8 md:pl-0 mb-8 md:mb-0">
                  <ul className="list-none text-gray-800 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i} className="mb-2 last:mb-0">
                        {res}
                      </li>
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
          <SectionTitle className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 mb-12 text-gray-900 dark:text-white">
            <span className="w-2 h-2 bg-green-700 dark:bg-green-400 rounded-full animate-pulse"></span>
            <span>Recent Projects</span>
          </SectionTitle>
          <div className="flex flex-col gap-12 w-full">
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
          <SectionTitle className="text-2xl font-bold flex items-center gap-2 mb-8 animate-slide-in-left">
            <span className="w-2 h-2 bg-blue-700 dark:bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-gray-900 dark:text-white">About me</span>
          </SectionTitle>
          <div className="flex flex-col gap-6 w-full">
            {/* Primer párrafo a ancho completo */}
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-2 w-full animate-fade-in-delay2">
              Hi! I&apos;m{" "}
              <span className="font-bold text-blue-800 dark:text-blue-300">Bastian Fredes</span>, a
              passionate{" "}
              <span className="font-semibold text-blue-700 dark:text-yellow-300">
                Solution Architect
              </span>{" "}
              and{" "}
              <span className="font-semibold text-green-700 dark:text-green-300">Tech Lead</span>{" "}
              based in{" "}
              <span className="font-semibold text-purple-700 dark:text-purple-300">
                Galway, Ireland
              </span>
              .<br className="hidden md:inline" />
              <br />I have{" "}
              <span className="font-bold text-blue-700 dark:text-yellow-400">
                10+ years of experience
              </span>{" "}
              building scalable, maintainable, and delightful digital products
              for companies and startups worldwide. My journey started as a
              hobby in high school, and today I lead distributed teams, design
              cloud-native architectures, and deliver high-impact solutions.
            </p>
            {/* Luego grid para texto final + lista + imagen */}
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 items-center w-full">
              <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-4 animate-fade-in-delay3">
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-2 space-y-1">
                  <li>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">
                      Led architecture
                    </span>{" "}
                    for complex Vtex IO integrations (payments, Icecat, ERP
                    sync) across LATAM and EU markets.
                  </li>
                  <li>
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Tech Lead
                    </span>{" "}
                    for distributed teams (React, Node.js, Python).
                  </li>
                  <li>
                    <span className="font-semibold text-pink-800 dark:text-pink-200">
                      Cloud-native
                    </span>{" "}
                    solutions with CI/CD, GitHub Actions, Docker, RESTful APIs.
                  </li>
                  <li>
                    <span className="font-semibold text-purple-800 dark:text-purple-200">
                      Certified
                    </span>{" "}
                    in Vtex IO development; experienced with Agile/Scrum.
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-400 text-base md:text-lg">
                  My mission is to{" "}
                  <span className="font-semibold text-blue-800 dark:text-blue-300">
                    empower people and businesses
                  </span>{" "}
                  through technology, mentoring, and continuous learning. <br />
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  tech, reading, or going on motorcycle adventures.
                </p>
              </div>
              <div className="flex justify-center md:justify-end md:pl-8 animate-float">
                <div className="relative group w-40 h-40 md:w-56 md:h-56">
                  <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-60 group-hover:opacity-80 transition duration-500 animate-blob-move"></div>
                  <Image
                    src="/me.jpg"
                    alt="Bastian Fredes profile"
                    width={220}
                    height={220}
                    className="rounded-3xl object-cover w-40 h-40 md:w-56 md:h-56 border-4 border-[#232946] shadow-xl rotate-2 group-hover:rotate-0 transition-transform duration-500 relative z-10 animate-float"
                    loading="lazy"
                    sizes="(max-width: 768px) 160px, 220px"
                    priority={false}
                  />
                </div>
              </div>
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
          <SectionTitle className="mb-6 text-blue-700 dark:text-blue-400 flex items-center gap-2 text-lg md:text-xl animate-slide-in-up">
            <span className="w-2 h-2 bg-purple-700 dark:bg-purple-500 rounded-full animate-pulse"></span>
            <span>Contact</span>
          </SectionTitle>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-lg animate-fade-in-delay2">
                Let&apos;s work together!
              </h4>
              <p className="text-base md:text-lg text-gray-700 dark:text-slate-300 mb-2 max-w-xl mx-auto md:mx-0 animate-fade-in-delay3">
                I&apos;m open to new opportunities, collaborations, and
                freelance projects. You can contact me using the form or
                directly by email.
              </p>
              <div className="flex flex-col items-center md:items-start gap-2 mb-10 animate-fade-in-delay4">
                <ContactInfoObfuscated email={profile.socialLinks.email} phone={profile.socialLinks.phone} />
              </div>
              <div className="flex justify-center md:justify-start gap-4 mb-4 animate-fade-in-delay4">
                <a
                  href="mailto:me@bassfredes.dev"
                  className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-red-400 via-pink-500 to-yellow-400 shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-red-400 animate-bounce-slow"
                  aria-label="Email"
                >
                  <FaEnvelope
                    size={36}
                    className="text-white drop-shadow-md group-hover:text-yellow-200 transition-colors"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/bassfredes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-blue-700 shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-slow"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin
                    size={36}
                    className="text-white drop-shadow-md group-hover:text-blue-200 transition-colors"
                  />
                </a>
                <a
                  href="https://github.com/bassfredes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-gray-700 via-gray-900 to-black shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-gray-400 animate-bounce-slow"
                  aria-label="GitHub"
                >
                  <FaGithub
                    size={36}
                    className="text-white drop-shadow-md group-hover:text-gray-300 transition-colors"
                  />
                </a>
              </div>
            </div>
            <ContactFormClientWrapper />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
