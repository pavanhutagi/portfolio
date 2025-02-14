"use client";

import Social from "./social";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="w-[1250px] h-[300px] bg-[#414141] rounded-t-[50px] flex flex-col items-center gap-8 pt-10"
    >
      <Social />
    </footer>
  );
}
