"use client";

import { useEffect, useState } from "react";

import { useIdleVisibility } from "@/hooks/useIdleVisibility";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const isVisible = useIdleVisibility();
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.getElementById(href));

    const handleScroll = () => {
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
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 p-10 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-fit mx-auto bg-gradient-to-t from-[#202020] to-[#303030] rounded-2xl px-10 py-5 border border-[#242424]">
        <div className="flex gap-16">
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`${
                activeSection === href ? "text-[#C86765]" : "text-[#D4D4D4]"
              } hover:opacity-50 transition-opacity`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
