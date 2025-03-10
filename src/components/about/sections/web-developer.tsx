import React from "react";

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAngular,
  SiCanva,
  SiCss3,
  SiExpress,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiOpenai,
  SiPhp,
  SiPostman,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiWebflow,
  SiWix,
} from "react-icons/si";

// Tech item type definition
type TechItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
};

// Work experience type definition
type WorkExperience = {
  title: string;
  type: string;
  company: string;
  period: string;
  responsibilities: string[];
};

export default function WebDeveloper() {
  // Helper function to render tech items
  const renderTechItem = (item: TechItem) => (
    <a
      key={item.name}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-700 rounded-lg p-2 bg-white hover:border-primary-500 transition-colors duration-200"
    >
      <span className="flex items-center gap-2">
        {item.icon}
        <p className="text-black">{item.name}</p>
      </span>
    </a>
  );

  // Helper function to render a tech category
  const renderTechCategory = (title: string, items: TechItem[]) => (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-sm">{title}</p>
      <div className="flex flex-wrap gap-2">{items.map(renderTechItem)}</div>
    </div>
  );

  // Frontend frameworks data
  const frontendFrameworks: TechItem[] = [
    {
      name: "Next.js",
      url: "https://nextjs.org/",
      icon: <SiNextdotjs size={16} className="text-black" />,
    },
    {
      name: "React",
      url: "https://reactjs.org/",
      icon: <SiReact size={16} className="text-[#61DAFB]" />,
    },
    {
      name: "Angular",
      url: "https://angular.io/",
      icon: <SiAngular size={16} className="text-[#DD0031]" />,
    },
  ];

  // Backend frameworks data
  const backendFrameworks: TechItem[] = [
    {
      name: "Node.js",
      url: "https://nodejs.org/",
      icon: <SiNodedotjs size={16} className="text-[#339933]" />,
    },
    {
      name: "Express.js",
      url: "https://expressjs.com/",
      icon: <SiExpress size={16} className="text-black" />,
    },
    {
      name: "Laravel",
      url: "https://laravel.com/",
      icon: <SiLaravel size={16} className="text-[#FF2D20]" />,
    },
  ];

  // Languages data
  const languages: TechItem[] = [
    {
      name: "HTML5",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: <SiHtml5 size={16} className="text-[#E34F26]" />,
    },
    {
      name: "CSS3",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: <SiCss3 size={16} className="text-[#1572B6]" />,
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: <SiJavascript size={16} className="text-[#F7DF1E]" />,
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      icon: <SiTypescript size={16} className="text-[#3178C6]" />,
    },
    {
      name: "PHP",
      url: "https://www.php.net/",
      icon: <SiPhp size={16} className="text-[#777BB4]" />,
    },
  ];

  // Databases data
  const databases: TechItem[] = [
    {
      name: "MySQL",
      url: "https://www.mysql.com/",
      icon: <SiMysql size={16} className="text-[#4479A1]" />,
    },
    {
      name: "MongoDB",
      url: "https://www.mongodb.com/",
      icon: <SiMongodb size={16} className="text-[#47A248]" />,
    },
    {
      name: "IBM DB2",
      url: "https://www.ibm.com/products/db2",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 2H30V30H2V2Z" fill="#054ADA" />
          <path
            d="M16 24.5C20.6944 24.5 24.5 20.6944 24.5 16C24.5 11.3056 20.6944 7.5 16 7.5C11.3056 7.5 7.5 11.3056 7.5 16C7.5 20.6944 11.3056 24.5 16 24.5Z"
            fill="white"
          />
          <path
            d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z"
            fill="#054ADA"
          />
        </svg>
      ),
    },
  ];

  // Styling & UI data
  const stylingUI: TechItem[] = [
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      icon: <SiTailwindcss size={16} className="text-[#06B6D4]" />,
    },
    {
      name: "Material UI",
      url: "https://mui.com/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 36 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839z"
            fill="#0081CB"
          />
        </svg>
      ),
    },
    {
      name: "Angular Material",
      url: "https://material.angular.io/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5L2.5 6.167L4.1 17.831L12 22.5L19.9 17.831L21.5 6.167L12 2.5Z"
            fill="#FFA726"
          />
          <path d="M12 2.5L12 22.5L19.9 17.831L21.5 6.167L12 2.5Z" fill="#FB8C00" />
          <path
            d="M12 5.7L6.7 17.3H8.9L10.3 13.7H13.7L15.1 17.3H17.3L12 5.7ZM12 8.9L13.1 11.7H10.9L12 8.9Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.002 3.272C4.002 2.695 4.427 2.272 5.002 2.272H10.002C11.659 2.272 13.002 3.615 13.002 5.272C13.002 6.383 12.392 7.349 11.482 7.833C12.673 8.222 13.502 9.349 13.502 10.672C13.502 12.499 12.022 14.002 10.202 14.002H5.002C4.427 14.002 4.002 13.579 4.002 13.002V3.272ZM6.002 7.272V4.272H10.002C10.554 4.272 11.002 4.72 11.002 5.272C11.002 5.824 10.554 6.272 10.002 6.272H6.502C6.227 6.272 6.002 6.497 6.002 6.772V7.272ZM6.002 9.272V12.002H10.202C10.924 12.002 11.502 11.424 11.502 10.702C11.502 9.979 10.924 9.402 10.202 9.402H6.502C6.227 9.402 6.002 9.177 6.002 8.902V9.272Z"
            fill="#7952B3"
          />
        </svg>
      ),
    },
    {
      name: "Carbon Design System",
      url: "https://carbondesignsystem.com/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4C22.6 4 28 9.4 28 16C28 22.6 22.6 28 16 28Z"
            fill="black"
          />
          <path
            d="M16 10C12.7 10 10 12.7 10 16C10 19.3 12.7 22 16 22C19.3 22 22 19.3 22 16C22 12.7 19.3 10 16 10Z"
            fill="black"
          />
        </svg>
      ),
    },
  ];

  // State Management data
  const stateManagement: TechItem[] = [
    {
      name: "Redux",
      url: "https://redux.js.org/",
      icon: <SiRedux size={16} className="text-[#764ABC]" />,
    },
  ];

  // Testing data
  const testing: TechItem[] = [
    {
      name: "Jest",
      url: "https://jestjs.io/",
      icon: <SiJest size={16} className="text-[#C21325]" />,
    },
  ];

  // Development & Version Control data
  const devTools: TechItem[] = [
    {
      name: "Cursor",
      url: "https://cursor.sh/",
      icon: (
        <img
          src="/images/cursor-logo.avif"
          alt="Cursor IDE"
          width={18}
          height={18}
          className="rounded-sm"
        />
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: <SiGithub size={16} className="text-black" />,
    },
    {
      name: "Postman",
      url: "https://www.postman.com/",
      icon: <SiPostman size={16} className="text-[#FF6C37]" />,
    },
    {
      name: "Lighthouse",
      url: "https://developer.chrome.com/docs/lighthouse/overview/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4.5L3 9L12 13.5L21 9L12 4.5Z" fill="#F44B21" />
          <path d="M3 9V14.25L7.5 16.5V11.25L3 9Z" fill="#0535C1" />
          <path d="M7.5 16.5L12 18.75V13.5L7.5 11.25V16.5Z" fill="#1A73E8" />
          <path d="M12 13.5V18.75L16.5 16.5V11.25L12 13.5Z" fill="#0097A7" />
          <path d="M16.5 11.25V16.5L21 14.25V9L16.5 11.25Z" fill="#00BCD4" />
        </svg>
      ),
    },
    {
      name: "React DevTools",
      url: "https://react.dev/learn/react-developer-tools",
      icon: <SiReact size={16} className="text-[#61DAFB]" />,
    },
    {
      name: "Chrome DevTools",
      url: "https://developer.chrome.com/docs/devtools/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#4285F4"
          />
          <path
            d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z"
            fill="#4285F4"
          />
        </svg>
      ),
    },
    {
      name: "Firefox DevTools",
      url: "https://firefox-dev.tools/",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.634 8.557C21.634 8.557 21.634 8.557 21.634 8.557C20.943 5.661 18.668 3.197 15.8 2.286C16.902 3.663 17.539 5.143 17.8 6.714C17.8 6.714 17.8 6.714 17.8 6.714C15.714 3.857 12.571 3.143 10.143 1C9.857 1 9.571 1.143 9.429 1.286C9.286 1.286 9.286 1.429 9.286 1.571C8.571 2.714 8.429 4 8.571 5.286C8.857 7.571 10.143 9.714 12.143 11C10.429 9.857 9.143 7.857 8.857 5.714C7.286 7.429 6.571 9.857 7 12.286C7.143 13.143 7.429 14 7.857 14.714C5.429 13.143 4 10.429 4 7.571C4 7.143 4 6.714 4.143 6.286C1.857 8.714 1 12 2 15.143C2.857 18.143 5.143 20.571 8.143 21.571C11.429 22.714 15.143 22 17.857 19.857C20.857 17.571 22.286 13.714 21.634 8.557ZM16.714 18.714C14.143 20.429 10.714 20.143 8.429 18.143C8.143 17.857 7.857 17.571 7.714 17.286C9.429 17.714 11.286 17.429 12.714 16.429C14.143 15.429 15 13.857 15.143 12.143C16.143 12.714 16.857 13.714 17.143 14.857C17.429 16.143 17.286 17.571 16.714 18.714Z"
            fill="#FF9500"
          />
        </svg>
      ),
    },
  ];

  // AI & Productivity data
  const aiTools: TechItem[] = [
    {
      name: "ChatGPT",
      url: "https://chat.openai.com/",
      icon: <SiOpenai size={16} className="text-[#412991]" />,
    },
    {
      name: "Notion",
      url: "https://www.notion.so/",
      icon: <SiNotion size={16} className="text-black" />,
    },
  ];

  // Design & Prototyping data
  const designTools: TechItem[] = [
    {
      name: "Figma",
      url: "https://www.figma.com/",
      icon: <SiFigma size={16} className="text-[#F24E1E]" />,
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      icon: <SiCanva size={16} className="text-[#00C4CC]" />,
    },
    {
      name: "Illustrator",
      url: "https://www.adobe.com/products/illustrator.html",
      icon: <SiAdobeillustrator size={16} className="text-[#FF9A00]" />,
    },
    {
      name: "Photoshop",
      url: "https://www.adobe.com/products/photoshop.html",
      icon: <SiAdobephotoshop size={16} className="text-[#31A8FF]" />,
    },
  ];

  // No-Code Platforms data
  const noCodePlatforms: TechItem[] = [
    {
      name: "Wix",
      url: "https://www.wix.com/",
      icon: <SiWix size={16} className="text-black" />,
    },
    {
      name: "Webflow",
      url: "https://webflow.com/",
      icon: <SiWebflow size={16} className="text-[#4353FF]" />,
    },
  ];

  // Work experience data
  const workExperiences: WorkExperience[] = [
    {
      title: "Frontend Engineer",
      type: "Consultant",
      company: "DemTech.ai, Bengaluru",
      period: "February 2024 - January 2025",
      responsibilities: [
        "Laid the groundwork for the UI foundation of BeCause, a Citizen Mobilization Tool, using Next.js, TypeScript, Redux, Material UI, and Puck, enabling NGOs to manage campaigns and configurations.",
        "Built a design system by developing reusable wrapper components using Material UI.",
        "Created an admin dashboard to provide a unified view of all modules within the BeCause tool, improving accessibility and management.",
        "Designed and developed a UI screen for configuring Material UI themes through an intuitive interface.",
        "Engineered a campaigns module for end-to-end campaign configuration, including design and content.",
        "Crafted a visual builder using Puck, enabling users to design campaign pages with a drag-and-drop interface.",
        "Developed a server-side Data Grid component with search, sort, and pagination features for efficient data handling.",
      ],
    },
    {
      title: "Software Developer",
      type: "Full-Time",
      company: "IBM India Private Limited, Bengaluru",
      period: "September 2018 - December 2023",
      responsibilities: [
        "Datablocks Product (Tech Lead): Served as the technical leader for DataBlocks, a product designed to foster model developers in configuring data transformation and manipulation models.",
        "Mentored interns and junior developers, fostering understanding and implementation of technical requirements.",
        "Designed UI wireframes using Sketch App, adhering to IBM's Carbon Design System and UI/UX principles.",
        "Established a standard, comprehensible, and reusable UI codebase using Angular and Express.js.",
        "Implemented the 'Drag & Drop' feature on UI with Angular Material CDK.",
        "Challenges Module (Tech Lead): Headed a module that configures incentives-related challenges for IBM Sellers.",
        "Designed a comprehensive UI flow diagram, illustrating the entire application workflow.",
        "Integrated National Language System (NLS) for multi-lingual interface.",
        "Managed the migration of two years worth of data from legacy tables to newly defined tables.",
        "Digital Sales Tool Mapping: Implemented modules to automate the mapping of Client Contact Experience (CCX) modules to Sales Development Representative (SDR) profiles.",
        "Developed a universal tool for user registration and management, designed for easy integration with IBM React applications.",
        "Contributed to an in-house web application building framework using technologies - Next.js, Redux and IBM Carbon components.",
        "Seller Profile Incentive Module: Streamlined and refactored the code utilized for configuring incentive elements within the seller profiles.",
        "Optimised backend code and SQL queries, resulting in a significant reduction of load time from 2-3 minutes to just 5-10 seconds.",
        "Transaction Adjustments Module: Developed backend services to perform data validation, bulk insertion, and bulk deletion, facilitating efficient adjustment of seller's incentives.",
      ],
    },
    {
      title: "Software Developer",
      type: "Internship",
      company: "IBM India Private Limited, Bengaluru",
      period: "January 2018 - June 2018",
      responsibilities: [
        "Completed an internship with IBM CIO, focusing on the Sales Incentives System.",
        "Developed web solutions to meet specific business needs, utilizing technologies such as AngularJS, PHP, & IBM DB2.",
        "Engaged in Agile Methodologies to ensure efficient and effective project management and delivery.",
      ],
    },
  ];

  // Helper function to render work experience
  const renderWorkExperience = (experience: WorkExperience) => (
    <div
      key={`${experience.company}-${experience.period}`}
      className="flex flex-col gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4"
    >
      <div className="flex flex-col">
        <p className="font-bold flex items-center">{experience.company}</p>
        <p className="text-sm text-gray-500">
          {experience.title} | {experience.type} | {experience.period}
        </p>
      </div>
      <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm md:text-lg">
        I specialize in developing scalable, high-performance web applications with a strong focus
        on user experience, accessibility, and efficiency. With over 6 years of experience, I have
        worked on enterprise-level tools, UI systems, and interactive web applications that
        streamline workflows and enhance usability.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Technologies Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <p className="font-bold text-lg">Technologies</p>
          <div className="flex flex-col gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            {renderTechCategory("Frontend Frameworks", frontendFrameworks)}
            {renderTechCategory("Backend Frameworks", backendFrameworks)}
            {renderTechCategory("Languages", languages)}
            {renderTechCategory("Databases", databases)}
            {renderTechCategory("Styling & UI", stylingUI)}
            {renderTechCategory("State Management", stateManagement)}
            {renderTechCategory("Testing", testing)}
          </div>
        </div>

        {/* Tools Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <p className="font-bold text-lg">Tools</p>
          <div className="flex flex-col gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            {renderTechCategory("Development & Version Control", devTools)}
            {renderTechCategory("AI & Productivity", aiTools)}
            {renderTechCategory("Design & Prototyping", designTools)}
            {renderTechCategory("No-Code Platforms", noCodePlatforms)}
          </div>
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-lg">Work Experience</h4>
        <div className="flex flex-col gap-4">{workExperiences.map(renderWorkExperience)}</div>
      </div>

      <p>
        I'm passionate about blending technology and design, building scalable UI architectures, and
        crafting seamless, high-performance web experiences.
      </p>
    </div>
  );
}
