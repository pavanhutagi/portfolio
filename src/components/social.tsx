"use client";

import clsx from "clsx";
import { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

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
    <div className={clsx("flex gap-8")}>
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={clsx(
            "flex items-center justify-center",
            "h-[44px] w-[44px] clip-corner-sm",
            "border border-primary-500/40 bg-secondary-800/70 text-primary-400",
            "cursor-pointer transition-all hover:border-primary-500 hover:glow-cyan hover:text-primary-200"
          )}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
