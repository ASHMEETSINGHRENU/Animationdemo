"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductScrollAnimation from "@/components/ProductScrollAnimation";
import PropertySpecs from "@/components/PropertySpecs";
import InquiryModal from "@/components/InquiryModal";

export default function Home() {
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

      {/* Main 400vh Scroll-Driven Animation (The Pavilion - 40 frames) */}
      <ProductScrollAnimation
        totalFrames={40}
        baseFrameUrl="/assets/landing/ezgif-frame-"
        propertyTitle="The Pavilion Residence"
        tagline="Nest & Key • Architectural Archive"
        locationElevation="ELEVATION: 34.09° N • PACIFIC VILLA"
        objectFit="cover"
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Curated Architectural Dossier & Estate Details */}
      <PropertySpecs onOpenInquiry={handleOpenInquiry} />

      {/* Private Tour / Acquisition Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
    </main>
  );
}
