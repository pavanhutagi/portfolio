import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Pavan Hutagi | Frontend Engineer & Architect",
  description:
    "Portfolio of Pavan Hutagi — Frontend Engineer & Architect with 7+ years of experience building scalable, high-performance web applications. UI/UX & Graphic Designer based in Bengaluru.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oxanium.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
