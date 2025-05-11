import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
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
                        Open to work
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
                <br className="inline md:hidden" />
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
            <span className="text-white">Experience</span>
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
                    style={{ transform: "translateX(-50%)" }}
                  ></span>
                  <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold mb-0.5 leading-tight text-yellow-400">
                    {exp.role}
                  </h4>
                  <div className="text-base md:text-lg text-white font-semibold mb-0.5">
                    {exp.company}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mb-2">
                    {exp.duration}
                  </div>
                </div>
                {/* Columna derecha: responsabilidades */}
                <div className="md:col-span-7 flex flex-col justify-start md:justify-center h-full gap-2 pl-8 md:pl-0 mb-8 md:mb-0">
                  <ul className="list-none text-gray-300 leading-relaxed text-base md:text-lg">
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
          className="w-full lg:max-w-5xl md:max-w-3xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Projects"
          ariaLabel="Projects"
          role="region"
        >
          <SectionTitle className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 mb-12 text-white">
            <span className="text-2xl md:text-3xl text-blue-400"><svg xmlns='http://www.w3.org/2000/svg' className='inline-block' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M9.4 16.6L4.8 12l4.6-4.6l1.4 1.4L7.6 12l3.2 3.2zm5.2 0l-1.4-1.4L16.4 12l-3.2-3.2l1.4-1.4l4.6 4.6z'/></svg></span>
            <span>Projects</span>
          </SectionTitle>
          <div className="flex flex-col gap-12 w-full">
            {projects.map((project, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-[#181c2a]/80 dark:bg-[#181c2a]/80 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-800/40 hover:shadow-2xl transition-all group">
                <div className="w-full md:w-2/5 flex-shrink-0 flex items-center justify-center">
                  <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg border border-gray-700/40 bg-[#232946] flex items-center justify-center">
                    <Image src={project.image} alt={project.title} width={400} height={220} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      {project.title}
                      {project.badge && (
                        <span className="ml-2 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-badge-green animate-fade-in">
                          {project.badge}
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-800/70 text-blue-200 font-mono border border-blue-400/30">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 text-base md:text-lg leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-2">
                    {project.links.code && (
                      <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border border-blue-400 text-blue-400 bg-transparent hover:bg-blue-500 hover:text-white font-semibold transition-colors text-base shadow hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2">
                        <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' className='inline-block'><path fill='currentColor' d='M9.4 16.6L4.8 12l4.6-4.6l1.4 1.4L7.6 12l3.2 3.2zm5.2 0l-1.4-1.4L16.4 12l-3.2-3.2l1.4-1.4l4.6 4.6z'/></svg>
                        Code
                      </a>
                    )}
                    {project.links.preview && (
                      <a href={project.links.preview} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border border-green-400 text-green-400 bg-transparent hover:bg-green-500 hover:text-white font-semibold transition-colors text-base shadow hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center gap-2">
                        <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' className='inline-block'><path fill='currentColor' d='M12 7V3l7 7l-7 7v-4.1C7.6 12.9 5.5 15.5 5.5 15.5c1.5-4.5 6.5-5.5 6.5-5.5Z'/></svg>
                        Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-white">About me</span>
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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Contact</span>
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
