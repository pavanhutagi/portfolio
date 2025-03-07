"use client";

import Social from "./social";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="flex w-[90%] max-w-[1400px] flex-col items-center gap-8 rounded-t-[50px] bg-[#414141] pb-20 pt-10 sm:pb-40"
    >
      <Social />
    </footer>
  );
}
