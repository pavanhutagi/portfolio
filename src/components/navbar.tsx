"use client";

import { useEffect, useRef, useState } from "react";

import { navLinks } from "@/constants/nav-links";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function Navbar() {
  const isVisible = useIdleVisibility();
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
    <nav
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 p-10 transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } hidden md:block`}
    >
      <div className="mx-auto max-w-fit clip-corner border border-primary-500/40 bg-secondary-900/80 px-8 py-4 backdrop-blur-md glow-cyan">
        <div className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.2em]">
          {navLinks.map(({ href, label }, i) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className="group relative flex items-center gap-2 transition-colors"
            >
              <span
                className={
                  activeSection === href
                    ? "text-primary-400 neon-cyan"
                    : "text-text-secondaryDark hover:text-primary-300"
                }
              >
                <span className="mr-1 text-primary-500/60">0{i + 1}</span>
                {label}
              </span>
              <span
                className={`absolute -bottom-2 left-0 h-px bg-primary-500 transition-all duration-300 ${
                  activeSection === href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
