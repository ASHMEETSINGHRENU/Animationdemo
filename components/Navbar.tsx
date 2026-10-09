"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, Building2 } from "lucide-react";

interface NavbarProps {
  onOpenInquiry: () => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 md:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-auto">
      {/* Brand logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
            <span className="text-[13px] font-mono tracking-tighter text-amber-300 font-semibold">NK</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm tracking-[0.25em] uppercase font-light text-white">
              Nest<span className="font-semibold text-white/90">&amp;</span>Key
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/40">
              Private Estates
            </span>
          </div>
        </Link>

        {/* Property Switcher Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              pathname === "/"
                ? "bg-white text-black font-medium shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            The Pavilion
          </Link>
          <Link
            href="/villa"
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              pathname === "/villa"
                ? "bg-white text-black font-medium shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            The Grand Villa
          </Link>
        </nav>
      </div>

      {/* Property metadata badge */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-xs font-mono text-white/70">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>{pathname === "/villa" ? "THE GRAND VILLA" : "THE PAVILION RESIDENCE"}</span>
        <span className="text-white/20">•</span>
        <span className="text-white/90 font-medium">
          {pathname === "/villa" ? "$28,500,000 USD" : "$14,500,000 USD"}
        </span>
      </div>

      {/* Direct Call to Action & Mobile Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Switcher */}
        <div className="flex md:hidden items-center border border-white/10 rounded-full bg-black/50 backdrop-blur-md p-1">
          <Link
            href="/"
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${
              pathname === "/" ? "bg-white text-black font-medium" : "text-white/50"
            }`}
          >
            Pavilion
          </Link>
          <Link
            href="/villa"
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${
              pathname === "/villa" ? "bg-white text-black font-medium" : "text-white/50"
            }`}
          >
            Villa
          </Link>
        </div>

        <button
          onClick={onOpenInquiry}
          className="px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 text-xs font-medium uppercase tracking-wider text-white flex items-center gap-2 cursor-pointer"
        >
          <PhoneCall className="w-3 h-3" />
          <span>Inquire</span>
        </button>
      </div>
    </header>
  );
}
