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
      <div className="mx-auto max-w-fit rounded-2xl border border-[#393939] bg-gradient-to-t from-[#202020] to-[#303030] px-10 py-5">
        <div className="flex gap-16">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`${
                activeSection === href ? "text-[#C86765]" : "text-[#D4D4D4]"
              } transition-opacity hover:opacity-50`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
