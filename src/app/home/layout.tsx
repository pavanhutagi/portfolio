import { Oxanium } from "next/font/google";

const oxanium = Oxanium({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={oxanium.className}>{children}</body>
    </html>
  );
}
