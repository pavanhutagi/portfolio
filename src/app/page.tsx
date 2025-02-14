"use client";

import AboutSection from "@/sections/about-section";
import AudioControl from "@/components/audio-control";
import ContactSection from "@/sections/contact-section";
import Footer from "@/components/footer";
import HomeSection from "@/sections/home-section";
import LeftNeonBulb from "@/components/left-neon-bulb";
import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import ParticlesBackground from "@/components/particles-background";
import RightNeonBulb from "@/components/right-neon-bulb";
import Scroll from "@/components/scroll";
import ThemeToggle from "@/components/theme-toggle";

export default function Root() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ParticlesBackground />

        <Logo />
        <ThemeToggle />

        <LeftNeonBulb />

        <main className="main-content">
          <HomeSection />
          <AboutSection />
          <ContactSection />
        </main>

        <RightNeonBulb />

        <AudioControl />
        <Navbar />
        <Scroll />

        <Footer />
      </div>
    </>
  );
}
