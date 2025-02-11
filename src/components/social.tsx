"use client";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { IconType } from "react-icons";
import { useIdleVisibility } from "@/hooks/useIdleVisibility";

interface SocialLink {
  href: string;
  icon: IconType;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/pavan-hutagi",
    icon: FaLinkedin,
    label: "LinkedIn Profile",
  },
  {
    href: "https://github.com/pavanhutagi",
    icon: FaGithub,
    label: "GitHub Profile",
  },
  {
    href: "https://www.instagram.com/pavan_hutagi/",
    icon: FaInstagram,
    label: "Instagram Profile",
  },
];

export default function Social() {
  const isVisible = useIdleVisibility();

  return (
    <div
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 flex flex-col gap-8 transition-all duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-40"
      }`}
    >
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[#1D1D1D] transition-opacity cursor-pointer"
        >
          <Icon size={40} />
        </a>
      ))}
    </div>
  );
}
