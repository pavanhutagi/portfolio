import { useEffect, useRef, useState } from "react";

import { navLinks } from "@/constants/nav-links";

export default function Menu() {
  const [activeSection, setActiveSection] = useState("home");
  const isScrollingRef = useRef(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      setActiveSection(sectionId);

      element.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.getElementById(href));

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-8 sm:right-8 sm:top-8 lg:right-10 lg:top-10 z-40 visible opacity-100 md:invisible md:opacity-0 flex justify-between items-center bg-gray-400 dark:bg-gray-800 rounded-3xl p-4 w-[150px]">
      <div className="flex flex-col gap-4">
        {navLinks.map(({ href, label }) => (
          <button
            key={href}
            onClick={() => scrollToSection(href)}
            className={`${
              activeSection === href ? "text-primary-500" : "text-text-light dark:text-text-dark"
            } transition-opacity hover:opacity-50 flex`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
