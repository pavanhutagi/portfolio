import "./globals.css";

import AudioControl from "@/components/audio-control";
import Logo from "@/components/logo";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Oxanium } from "next/font/google";
import Social from "@/components/social";
import ThemeToggle from "@/components/theme-toggle";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pavan Hutagi",
  description: "Portfolio of Pavan Hutagi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxanium.className} antialiased`}>
        <Logo />
        <ThemeToggle />
        <main className="main-content">{children}</main>
        <div className="invisible opacity-0 md:visible md:opacity-100 transition-all duration-300">
          <Social />
          <AudioControl />
        </div>
        <Navbar />
      </body>
    </html>
  );
}
