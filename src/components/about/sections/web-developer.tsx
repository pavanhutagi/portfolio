import React from "react";

import {
  SiAngular,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default function WebDeveloper() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm md:text-lg">
        I specialize in developing scalable, high-performance web applications with a strong focus
        on user experience, accessibility, and efficiency. With over six years of experience, I have
        worked on enterprise-level tools, UI systems, and interactive web applications that
        streamline workflows and enhance usability.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 w-full md:w-1/2">
          <p className="font-bold text-lg">Technologies</p>
          <div className="flex flex-wrap gap-2">
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiNextdotjs size={16} className="text-black" />
                <p className="text-black">Next.js</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiReact size={16} className="text-[#61DAFB]" />
                <p className="text-black">React</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiTypescript size={16} className="text-[#3178C6]" />
                <p className="text-black">TypeScript</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiJavascript size={16} className="text-[#F7DF1E]" />
                <p className="text-black">JavaScript</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiHtml5 size={16} className="text-[#E34F26]" />
                <p className="text-black">HTML5</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiCss3 size={16} className="text-[#1572B6]" />
                <p className="text-black">CSS3</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiTailwindcss size={16} className="text-[#06B6D4]" />
                <p className="text-black">Tailwind CSS</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiSass size={16} className="text-[#CC6699]" />
                <p className="text-black">SASS/SCSS</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiAngular size={16} className="text-[#DD0031]" />
                <p className="text-black">Angular</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiRedux size={16} className="text-[#764ABC]" />
                <p className="text-black">Redux</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiNodedotjs size={16} className="text-[#339933]" />
                <p className="text-black">Node.js</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiExpress size={16} className="text-black" />
                <p className="text-black">Express.js</p>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 w-full md:w-1/2">
          <p className="font-bold text-lg">Tools</p>
          <div className="flex flex-wrap gap-2">
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiGit size={16} className="text-[#F05032]" />
                <p className="text-black">Git</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiGithub size={16} className="text-black" />
                <p className="text-black">GitHub</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiDocker size={16} className="text-[#2496ED]" />
                <p className="text-black">Docker</p>
              </span>
            </div>
            <div className="border border-gray-700 rounded-lg p-2 bg-white">
              <span className="flex items-center gap-2">
                <SiJest size={16} className="text-[#C21325]" />
                <p className="text-black">Jest</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-lg">Work Experience</h4>

        <div className="flex flex-col gap-2">
          <p className="font-bold flex items-center">
            Frontend Engineer - Consultant (DemTech.ai, 2024 - 2025)
          </p>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
            <li>
              Built the UI foundation for BeCause, a citizen mobilization tool for NGOs using
              Next.js, TypeScript, and Material UI.
            </li>
            <li>
              Developed a drag-and-drop campaign builder with Puck, allowing NGOs to create
              interactive campaign pages.
            </li>
            <li>Designed an admin dashboard for centralized campaign management.</li>
            <li>Engineered a server-side Data Grid for handling large datasets efficiently.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold">Software Developer (IBM India Pvt. Ltd, 2018 - 2023)</p>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem" }}>
            <li>
              Led the UI development for DataBlocks, a data transformation tool, using Angular &
              Express.js.
            </li>
            <li>
              Built a drag-and-drop interface with Angular Material CDK for seamless data
              configuration.
            </li>
            <li>
              Developed the Challenges Module, enabling IBM sellers to configure and track
              incentives.
            </li>
            <li>Optimized backend queries, reducing load time from 2-3 minutes to 5-10 seconds.</li>
            <li>
              Created a universal registration tool, improving authentication across IBM's React
              applications.
            </li>
          </ul>
        </div>
      </div>

      <p>
        I'm passionate about blending technology and design, building scalable UI architectures, and
        crafting seamless, high-performance web experiences.
      </p>
    </div>
  );
}
