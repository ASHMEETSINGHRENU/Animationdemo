"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Maximize2,
  BedDouble,
  Bath,
  TreePine,
  Waves,
  Calendar,
  Compass,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

interface PropertySpecsProps {
  onOpenInquiry: () => void;
}

const SPECS = [
  {
    icon: Maximize2,
    label: "Interior Living Area",
    value: "8,450",
    unit: "SQ FT",
    desc: "Conditioned architectural space with 12-ft volume ceilings throughout.",
  },
  {
    icon: BedDouble,
    label: "Private Bedroom Suites",
    value: "05",
    unit: "SUITES",
    desc: "Primary suite with dual dressing quarters and private exterior terrace.",
  },
  {
    icon: Bath,
    label: "Bathrooms",
    value: "07",
    unit: "SPA BATHS",
    desc: "Monolithic Italian marble slabs and Dornbracht concealed brass fixtures.",
  },
  {
    icon: Waves,
    label: "Infinity Horizon Pool",
    value: "65",
    unit: "FEET",
    desc: "Heated saltwater lap pool with submerged Baja shelf and integrated spa.",
  },
  {
    icon: TreePine,
    label: "Private Lot Size",
    value: "0.75",
    unit: "ACRES",
    desc: "Fully mature olive groves, architectural perimeter fencing, and security.",
  },
  {
    icon: Calendar,
    label: "Completion Year",
    value: "2025",
    unit: "NEW BUILD",
    desc: "Engineered to premier seismic standards and Net-Zero solar ready.",
  },
];

const HIGHLIGHTS = [
  "Motorized Fleetwood pocketing glass wall systems",
  "Custom Poliform kitchen with Gaggenau 400 Series suite",
  "Subterranean temperature-controlled 600-bottle wine cellar",
  "Crestron Home complete automation & biometric security access",
  "Multi-zone radiant in-floor heating & acoustic vibration isolation",
  "3-car gallery showroom garage with dual Level 2 EV charging",
];

export default function PropertySpecs({ onOpenInquiry }: PropertySpecsProps) {
  return (
    <section className="relative w-full bg-[#050505] text-white py-28 px-6 md:px-14 lg:px-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 tracking-widest uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>ARCHITECTURAL DOSSIER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-white/95 leading-tight">
              Curated Specifications &amp; <br />
              Structural Mastery.
            </h2>
          </div>
          <p className="text-white/50 text-sm md:text-base font-light max-w-md leading-relaxed">
            Every millimeter of The Pavilion Residence has been sculpted with intention —
            marrying organic raw materials with modern architectural precision.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {SPECS.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 group-hover:text-amber-300 group-hover:border-amber-300/30 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-white/30 uppercase">
                    SPEC // {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-light tracking-tight text-white/95">
                    {spec.value}
                  </span>
                  <span className="text-xs font-mono text-amber-300/80 tracking-widest uppercase">
                    {spec.unit}
                  </span>
                </div>

                <h3 className="text-sm font-medium text-white/80 mb-2">{spec.label}</h3>
                <p className="text-xs text-white/45 font-light leading-relaxed">{spec.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Highlights List */}
        <div className="p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent mb-24">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-amber-300/80 tracking-widest uppercase block mb-1">
                EXCEPTIONAL APPOINTMENTS
              </span>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white/95">
                Bespoke Residence Features
              </h3>
            </div>
            <KeyRound className="w-6 h-6 text-white/30 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="text-xs font-mono text-amber-300/70 pt-0.5">
                  {(idx + 1).toString().padStart(2, "0")}.
                </span>
                <span className="text-sm text-white/70 font-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Consultation Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-14 rounded-3xl border border-amber-300/20 bg-gradient-to-r from-amber-950/20 via-black to-black text-center md:text-left gap-8">
          <div>
            <span className="text-xs font-mono text-amber-300 tracking-widest uppercase block mb-2">
              CONFIDENTIAL INQUIRY
            </span>
            <h3 className="text-2xl md:text-4xl font-light text-white/95 tracking-tight mb-2">
              Begin your private acquisition.
            </h3>
            <p className="text-sm text-white/50 font-light max-w-lg">
              Represented exclusively by Nest&amp;Key Private Estates. Private walkthroughs and financial dossiers available upon verified registration.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-amber-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)] flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Request Private Dossier</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/30 gap-4">
          <div>
            <span>© 2026 NEST&amp;KEY PRIVATE ESTATES. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/60 cursor-pointer transition-colors">DISCLOSURES</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">TERMS OF PRIVACY</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">EQUAL HOUSING OPPORTUNITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
