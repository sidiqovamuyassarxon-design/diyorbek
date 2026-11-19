import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galactic Journey — Explore. Travel. Discover.",
  description: "An interactive 3D journey through our cosmic neighborhood."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
