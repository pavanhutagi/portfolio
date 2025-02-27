import { useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState(0);
  const totalSections = 4;

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveSection((prev) => (prev === totalSections - 1 ? 0 : prev + 1));
    } else {
      setActiveSection((prev) => (prev === 0 ? totalSections - 1 : prev - 1));
    }
  };

  return (
    <section id="about" className="flex min-h-screen items-center justify-center">
      <div className=" overflow-hidden flex h-[80vh] lg:h-[700px] w-[90%] max-w-[1200px] items-center justify-center rounded-[50px] relative">
        <div className="w-full h-full relative overflow-hidden">
          {/* Navigation buttons */}
          <button
            onClick={() => handleNavigation("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 dark:bg-gray-200/50 text-white dark:text-gray-800 p-3 rounded-full hover:bg-gray-800/80 dark:hover:bg-gray-200/80 transition-all"
            aria-label="Previous section"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => handleNavigation("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/50 dark:bg-gray-200/50 text-white dark:text-gray-800 p-3 rounded-full hover:bg-gray-800/80 dark:hover:bg-gray-200/80 transition-all"
            aria-label="Next section"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Carousel content */}
          <div
            className="w-full h-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSection * 100}%)` }}
          >
            {/* Section 1: About Me */}
            <div className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-8 bg-[#808080]"></div>

            {/* Section 2: Skills */}
            <div className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-8 bg-[#545454]"></div>

            {/* Section 3: Experience */}
            <div className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-8 bg-[#808080]"></div>

            {/* Section 4: Education */}
            <div className="min-w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-8 bg-[#545454]"></div>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {[...Array(totalSections)].map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`h-3 rounded-full transition-all ${
                  activeSection === index ? "bg-primary-400 w-6" : "bg-gray-400 w-3"
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
