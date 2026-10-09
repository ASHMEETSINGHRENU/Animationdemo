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
  Car,
} from "lucide-react";

interface VillaSpecsProps {
  onOpenInquiry: () => void;
}

const VILLA_SPECS = [
  {
    icon: Maximize2,
    label: "Total Living Volume",
    value: "14,200",
    unit: "SQ FT",
    desc: "Grand-scale conditioned living with 22-ft gallery ceilings and dual-wing layout.",
  },
  {
    icon: BedDouble,
    label: "Master & Guest Suites",
    value: "07",
    unit: "SUITES",
    desc: "Presidential master wing with dual walk-in dressing salons and private outdoor spa.",
  },
  {
    icon: Bath,
    label: "Marble Spa Bathrooms",
    value: "09",
    unit: "BATHS",
    desc: "Full slab Calacatta Gold marble, freestanding soaking tubs, and steam suites.",
  },
  {
    icon: Waves,
    label: "Reflecting Infinity Pool",
    value: "80",
    unit: "FEET",
    desc: "Zero-edge heated saltwater horizon pool with integrated swim-up cocktail bar.",
  },
  {
    icon: TreePine,
    label: "Gated Estate Grounds",
    value: "1.2",
    unit: "ACRES",
    desc: "Curated Royal Palms, manicured perimeter hedge, and biometric security gates.",
  },
  {
    icon: Car,
    label: "Motor Court & Showroom",
    value: "04",
    unit: "VEHICLES",
    desc: "Climate-controlled subterranean gallery with turntable and dual high-speed EV stations.",
  },
];

const VILLA_HIGHLIGHTS = [
  "Museum-caliber art walls with museum-grade directional LED lighting",
  "Custom dual chef's show kitchen and concealed catering prep scullery",
  "Cantilevered architectural floating stone staircase with illuminated steps",
  "Dedicated wellness pavilion with infrared cedar sauna, steam bath, and gym",
  "Bespoke 14-seat dining gallery with Italian glass chandelier and outdoor pocket doors",
  "Commercial-grade acoustic dampening and whole-estate Savant smart automation",
];

export default function VillaSpecs({ onOpenInquiry }: VillaSpecsProps) {
  return (
    <section className="relative w-full bg-[#050505] text-white py-28 px-6 md:px-14 lg:px-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 tracking-widest uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>THE SOVEREIGN DOSSIER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-white/95 leading-tight">
              The Grand Villa <br />
              Architectural Estate.
            </h2>
          </div>
          <p className="text-white/50 text-sm md:text-base font-light max-w-md leading-relaxed">
            Constructed with uncompromising materials and grand proportions, The Grand Villa
            embodies the zenith of contemporary coastal living and gallery-grade architecture.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {VILLA_SPECS.map((spec, i) => {
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
                PALM ISLAND SIGNATURE
              </span>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white/95">
                Grand Villa Distinctions
              </h3>
            </div>
            <KeyRound className="w-6 h-6 text-white/30 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
            {VILLA_HIGHLIGHTS.map((item, idx) => (
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
              EXCLUSIVE REPRESENTATION
            </span>
            <h3 className="text-2xl md:text-4xl font-light text-white/95 tracking-tight mb-2">
              Inquire regarding The Grand Villa.
            </h3>
            <p className="text-sm text-white/50 font-light max-w-lg">
              Offered at $28,500,000 USD. Private viewings and confidential architectural blueprints are arranged strictly by appointment.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-amber-200 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)] flex items-center gap-2 group whitespace-nowrap cursor-pointer"
          >
            <span>Request Villa Dossier</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/30 gap-4">
          <div>
            <span>© 2026 NEST&amp;KEY PRIVATE ESTATES. THE GRAND VILLA COLLECTION.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white/60 cursor-pointer transition-colors">DISCLOSURES</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">PRIVACY CODE</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">EQUAL HOUSING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
