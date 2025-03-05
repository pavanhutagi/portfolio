"use client";

import AudioControl from "@/components/audio-control";
import Footer from "@/components/footer";
import LeftNeonBulb from "@/components/left-neon-bulb";
import Logo from "@/components/logo";
import MenuButton from "@/components/menu-button";
import Navbar from "@/components/navbar";
import ParticlesBackground from "@/components/particles-background";
import RightNeonBulb from "@/components/right-neon-bulb";
import ScrollControl from "@/components/scroll-control";
import ThemeToggle from "@/components/theme-toggle";
import AppContextProvider from "@/context/app-context";
import AboutSection from "@/sections/about";
import ContactSection from "@/sections/contact";
import HomeSection from "@/sections/home";

export default function Root() {
  return (
    <AppContextProvider>
      <ParticlesBackground />

      <div className="flex flex-col items-center justify-center">
        <Logo />
        <ThemeToggle />
        <MenuButton />

        <LeftNeonBulb />

        <main className="w-full flex flex-col gap-20 lg:gap-0 mb-20 lg:mb-0">
          <HomeSection />
          <AboutSection />
          <ContactSection />
        </main>

        <RightNeonBulb />

        <AudioControl />
        <Navbar />
        <ScrollControl />

        <Footer />
      </div>
    </AppContextProvider>
  );
}
