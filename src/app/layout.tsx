import "./globals.css";

import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Pavan Hutagi",
  description: "Portfolio of Pavan Hutagi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oxanium.className} antialiased`}>{children}</body>
    </html>
  );
}
