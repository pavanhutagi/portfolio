import { useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useIdleVisibility } from "@/hooks/idle-visibility";

// Type definitions
interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  isVisible: boolean;
}

interface SectionIndicatorsProps {
  totalSections: number;
  activeSection: number;
  onChange: (index: number) => void;
  isVisible: boolean;
}

interface SectionProps {
  id: string;
  isActive: boolean;
}

// Navigation button component
const NavigationButton = ({ direction, onClick, isVisible }: NavigationButtonProps) => {
  const Icon = direction === "prev" ? FiChevronLeft : FiChevronRight;
  const position = direction === "prev" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      className={`absolute ${position} top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 dark:bg-gray-200/50 text-white dark:text-gray-800 p-3 rounded-full hover:bg-gray-800/80 dark:hover:bg-gray-200/80 transition-all ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Icon size={24} />
    </button>
  );
};

// Section indicators component
const SectionIndicators = ({
  totalSections,
  activeSection,
  onChange,
  isVisible,
}: SectionIndicatorsProps) => {
  return (
    <div
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {[...Array(totalSections)].map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`h-3 rounded-full transition-all ${
            activeSection === index ? "bg-primary-400 w-6" : "bg-gray-400 w-3"
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Individual section components
const AboutContent = ({ id, isActive }: SectionProps) => {
  return (
    <div id={id} className={`w-full h-full ${isActive ? "opacity-100" : "opacity-0 absolute"}`}>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full">
          <div className="bg-background-dark dark:bg-background-light h-full w-full flex justify-center flex-col gap-6 p-6">
            <h2 className="text-3xl font-bold text-text-dark dark:text-text-light">
              Hey, I'm Pavan 👋
            </h2>

            <h4 className="text-l text-text-dark dark:text-text-light">
              A frontend engineer, designer, DJ, and breakdancer from Bangalore, with roots in
              Belagavi. I thrive at the intersection of technology, creativity, and movement.
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">💻</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">
                    Frontend Engineer
                  </h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  I craft sleek, interactive web experiences with clean code and modern UI/UX.
                </p>
              </div>

              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">🎨</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">Design</h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  I shape compelling visuals through UI/UX, graphic design, and branding.
                </p>
              </div>

              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">🎧</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">DJ</h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  I mix beats, create soundscapes, and love making people move.
                </p>
              </div>

              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">🕺</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">Breakdancing</h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  For me, rhythm is everywhere—in code, music, and movement.
                </p>
              </div>

              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">🎒</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">Backpacking</h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  Exploring remote places, new cultures, and chasing experiences fuels my
                  creativity.
                </p>
              </div>

              <div className="bg-gray-800 dark:bg-gray-200 p-3 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-l">🌀</span>
                  </div>
                  <h3 className="font-bold text-text-dark dark:text-text-light">Spiritual</h3>
                </div>
                <p className="text-sm text-text-dark dark:text-text-light">
                  I believe in the power of intuition, energy, and the universe guiding my journey.
                </p>
              </div>
            </div>

            <span className="text-text-dark dark:text-text-light">
              For me, life is about building, moving, and creating—one project, one beat, and one
              adventure at a time.
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <div className="bg-[#a65959] h-full w-full">
            <img
              src="/images/me.jpeg"
              alt="About me"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsContent = ({ id, isActive }: SectionProps) => {
  return (
    <div
      id={id}
      className={`min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center ${
        isActive ? "opacity-100" : "opacity-0 absolute"
      }`}
    >
      <div className="h-full w-full bg-[#40a16a]"></div>
    </div>
  );
};

const ExperienceContent = ({ id, isActive }: SectionProps) => {
  return (
    <div
      id={id}
      className={`min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center ${
        isActive ? "opacity-100" : "opacity-0 absolute"
      }`}
    >
      <div className="h-full w-full bg-[#407aad]"></div>
    </div>
  );
};

const EducationContent = ({ id, isActive }: SectionProps) => {
  return (
    <div
      id={id}
      className={`min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center ${
        isActive ? "opacity-100" : "opacity-0 absolute"
      }`}
    >
      <div className="h-full w-full bg-[#8fb55a]"></div>
    </div>
  );
};

const sections = [
  { id: "about", Component: AboutContent },
  { id: "skills", Component: SkillsContent },
  { id: "experience", Component: ExperienceContent },
  { id: "education", Component: EducationContent },
];

const totalSections = sections.length;

// Main component
export default function AboutSection() {
  const [activeSection, setActiveSection] = useState(0);
  const isVisible = useIdleVisibility();

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveSection((prev) => (prev === totalSections - 1 ? 0 : prev + 1));
    } else {
      setActiveSection((prev) => (prev === 0 ? totalSections - 1 : prev - 1));
    }
  };

  return (
    <section id="about" className="flex h-screen items-center justify-center">
      <div className="overflow-hidden flex h-[80vh] lg:h-[700px] w-[90%] max-w-[1200px] rounded-[50px]">
        <div className="w-full h-full relative">
          <NavigationButton
            direction="prev"
            onClick={() => handleNavigation("prev")}
            isVisible={isVisible}
          />

          <NavigationButton
            direction="next"
            onClick={() => handleNavigation("next")}
            isVisible={isVisible}
          />

          {sections.map((section, index) => (
            <section.Component
              key={section.id}
              id={section.id}
              isActive={activeSection === index}
            />
          ))}

          <SectionIndicators
            totalSections={totalSections}
            activeSection={activeSection}
            onChange={setActiveSection}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}
