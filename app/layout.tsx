import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NestAndKey | The Pavilion Residence — Architectural Living",
  description: "Experience The Pavilion Residence by NestAndKey. An award-winning architectural masterpiece offering seamless indoor-outdoor living, private infinity pool, and bespoke craftsmanship.",
  keywords: ["NestAndKey", "Luxury Real Estate", "Architectural Living", "Modern Villa", "The Pavilion Residence"],
  openGraph: {
    title: "NestAndKey | The Pavilion Residence",
    description: "An exclusive architectural masterpiece presented by NestAndKey.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#050505] text-[#f5f5f7] antialiased selection:bg-amber-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
