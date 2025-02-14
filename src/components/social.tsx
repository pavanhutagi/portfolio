"use client";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { IconType } from "react-icons";

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
  return (
    <div className="flex gap-8">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#D4D4D4] hover:bg-white transition-all cursor-pointer"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
