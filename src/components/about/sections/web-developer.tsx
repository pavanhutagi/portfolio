import React from "react";

import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAngular,
  SiCss3,
  SiExpress,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiOpenai,
  SiPostman,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiWebflow,
  SiWix,
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
        <div className="flex flex-col gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4 w-full md:w-1/2">
          <p className="font-bold text-lg">Technologies</p>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Frontend Frameworks</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiNextdotjs size={16} className="text-black" />
                  <p className="text-black">Next.js</p>
                </span>
              </a>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiReact size={16} className="text-[#61DAFB]" />
                  <p className="text-black">React</p>
                </span>
              </a>
              <a
                href="https://angular.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiAngular size={16} className="text-[#DD0031]" />
                  <p className="text-black">Angular</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Languages</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiTypescript size={16} className="text-[#3178C6]" />
                  <p className="text-black">TypeScript</p>
                </span>
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiJavascript size={16} className="text-[#F7DF1E]" />
                  <p className="text-black">JavaScript</p>
                </span>
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiHtml5 size={16} className="text-[#E34F26]" />
                  <p className="text-black">HTML5</p>
                </span>
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiCss3 size={16} className="text-[#1572B6]" />
                  <p className="text-black">CSS3</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Styling & UI</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiTailwindcss size={16} className="text-[#06B6D4]" />
                  <p className="text-black">Tailwind CSS</p>
                </span>
              </a>
              <a
                href="https://sass-lang.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiSass size={16} className="text-[#CC6699]" />
                  <p className="text-black">Sass</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Backend & State Management</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiRedux size={16} className="text-[#764ABC]" />
                  <p className="text-black">Redux</p>
                </span>
              </a>
              <a
                href="https://nodejs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiNodedotjs size={16} className="text-[#339933]" />
                  <p className="text-black">Node.js</p>
                </span>
              </a>
              <a
                href="https://expressjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiExpress size={16} className="text-black" />
                  <p className="text-black">Express.js</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Testing</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://jestjs.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiJest size={16} className="text-[#C21325]" />
                  <p className="text-black">Jest</p>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border border-gray-300 dark:border-gray-700 rounded-lg p-4 w-full md:w-1/2">
          <p className="font-bold text-lg">Tools</p>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Development & Version Control</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiGithub size={16} className="text-black" />
                  <p className="text-black">GitHub</p>
                </span>
              </a>
              <a
                href="https://cursor.sh/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <img
                    src="/images/cursor-logo.avif"
                    alt="Cursor IDE"
                    width={18}
                    height={18}
                    className="rounded-sm"
                  />
                  <p className="text-black">Cursor</p>
                </span>
              </a>
              <a
                href="https://www.postman.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiPostman size={16} className="text-[#FF6C37]" />
                  <p className="text-black">Postman</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">AI & Productivity</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://chat.openai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiOpenai size={16} className="text-[#412991]" />
                  <p className="text-black">ChatGPT</p>
                </span>
              </a>
              <a
                href="https://www.notion.so/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiNotion size={16} className="text-black" />
                  <p className="text-black">Notion</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Design & Prototyping</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.figma.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiFigma size={16} className="text-[#F24E1E]" />
                  <p className="text-black">Figma</p>
                </span>
              </a>
              <a
                href="https://www.adobe.com/products/illustrator.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiAdobeillustrator size={16} className="text-[#FF9A00]" />
                  <p className="text-black">Illustrator</p>
                </span>
              </a>
              <a
                href="https://www.adobe.com/products/photoshop.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiAdobephotoshop size={16} className="text-[#31A8FF]" />
                  <p className="text-black">Photoshop</p>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">No-Code Platforms</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.wix.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiWix size={16} className="text-black" />
                  <p className="text-black">Wix</p>
                </span>
              </a>
              <a
                href="https://webflow.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-700 rounded-lg p-2 bg-white"
              >
                <span className="flex items-center gap-2">
                  <SiWebflow size={16} className="text-[#4353FF]" />
                  <p className="text-black">Webflow</p>
                </span>
              </a>
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
