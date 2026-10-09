"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductScrollAnimation, { StoryStagesConfig } from "@/components/ProductScrollAnimation";
import VillaSpecs from "@/components/VillaSpecs";
import InquiryModal from "@/components/InquiryModal";

const VILLA_STORY_STAGES: StoryStagesConfig = {
  hero: {
    badge: "Sovereign Architectural Offering",
    titlePrimary: "The Grand Villa",
    titleItalic: "Estate",
    description:
      "A monumental Palm Island coastal sanctuary. Gated private motor court, soaring double-height volumes, sculptural art corridors, and boundless resort-scale living.",
    scrollPrompt: "Scroll to tour the estate",
  },
  stage1: {
    tag: "01 // GRAND ARRIVAL & ENTRY PORTAL",
    heading: "Monumental presence \nin pristine white.",
    description:
      "A private gated motor court bordered by mature royal palms leads to a commanding double-height architectural entrance. Stepping through reveals a radiant, gallery-scale arrival hall filled with ambient sun and museum-grade finishes.",
    specs: [
      { label: "Grand Volume", value: "22 Ft Ceilings" },
      { label: "Gated Grounds", value: "1.2 Private Acres" },
    ],
  },
  stage2: {
    tag: "02 // THE OPEN-CONCEPT LIVING SALON",
    heading: "Boundless space \nand curated art.",
    description:
      "The great salon spans effortlessly across custom terrazzo floors, framed by oversized contemporary canvases, bespoke lounge seating, and floor-to-ceiling motorized pocket doors opening directly to the reflecting pool terrace.",
    specs: [
      { label: "Horizon Pool", value: "80 Ft Zero-Edge" },
      { label: "Pocketing Glass", value: "Fleetwood 12-Ft" },
    ],
  },
  stage3: {
    tag: "03 // BANQUET GALLERY & RESIDENCE WING",
    heading: "Architectural mastery \nwithout compromise.",
    description:
      "A sculpted 14-seat dining gallery crowned by a modern crystal chandelier stands adjacent to the cantilevered stone staircase, leading to seven private bedroom suites, private spa salons, and rooftop ocean observation deck.",
    primaryButtonText: "Schedule Private Walkthrough",
    secondaryButtonText: "Download Sovereign Dossier PDF",
  },
};

export default function VillaPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleOpenInquiry = () => {
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-400/30 selection:text-white">
      {/* Top Floating Navigation with Route Switcher */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main 400vh Scroll-Driven Animation (The Grand Villa - 113 Full HD frames) */}
      <ProductScrollAnimation
        totalFrames={113}
        baseFrameUrl="/assets/villa/ezgif-frame-"
        propertyTitle="The Grand Villa Estate"
        tagline="Nest & Key • Sovereign Collection"
        locationElevation="ELEVATION: 25.76° N • PALM ISLAND VILLA"
        stages={VILLA_STORY_STAGES}
        objectFit="cover"
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Sovereign Dossier & Estate Details */}
      <VillaSpecs onOpenInquiry={handleOpenInquiry} />

      {/* Private Tour / Acquisition Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
    </main>
  );
}
