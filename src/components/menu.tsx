import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

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
    <div
      className={clsx(
        "fixed z-40 flex w-[170px] items-center justify-between p-4 clip-corner",
        "right-6 top-20 sm:right-8 sm:top-24",
        "visible opacity-100 md:invisible md:opacity-0",
        "border border-primary-500/40 bg-secondary-900/90 backdrop-blur-md glow-cyan"
      )}
    >
      <div className="flex w-full flex-col gap-3 font-mono text-sm uppercase tracking-[0.2em]">
        {navLinks.map(({ href, label }, i) => (
          <button
            key={href}
            onClick={() => scrollToSection(href)}
            className={clsx(
              "flex items-center gap-2 transition-colors",
              activeSection === href
                ? "text-primary-400 neon-cyan"
                : "text-text-secondaryDark hover:text-primary-300"
            )}
          >
            <span className="text-primary-500/60">0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
