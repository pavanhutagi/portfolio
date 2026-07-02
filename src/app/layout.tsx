import type { Metadata } from "next";
import { Orbitron, Oxanium, Share_Tech_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Pavan Hutagi // Frontend Engineer & Architect",
  description:
    "Portfolio of Pavan Hutagi — Frontend Engineer & Architect with 7+ years of experience building scalable, high-performance web applications. UI/UX & Graphic Designer based in Bengaluru.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${oxanium.variable} ${orbitron.variable} ${shareTechMono.variable} ${oxanium.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
