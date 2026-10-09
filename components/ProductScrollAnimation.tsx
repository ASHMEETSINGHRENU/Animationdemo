"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  ShieldCheck,
} from "lucide-react";

export interface StoryStageSpec {
  label: string;
  value: string;
}

export interface StoryStagesConfig {
  hero: {
    badge: string;
    titlePrimary: string;
    titleItalic: string;
    description: string;
    scrollPrompt: string;
  };
  stage1: {
    tag: string;
    heading: string;
    description: string;
    specs: StoryStageSpec[];
  };
  stage2: {
    tag: string;
    heading: string;
    description: string;
    specs: StoryStageSpec[];
  };
  stage3: {
    tag: string;
    heading: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

export interface ProductScrollAnimationProps {
  totalFrames?: number;
  baseFrameUrl?: string;
  propertyTitle?: string;
  tagline?: string;
  locationElevation?: string;
  stages?: StoryStagesConfig;
  objectFit?: "cover" | "contain";
  onOpenInquiry?: () => void;
}

const DEFAULT_STAGES: StoryStagesConfig = {
  hero: {
    badge: "Exclusive Architectural Offering",
    titlePrimary: "The Pavilion",
    titleItalic: "Residence",
    description:
      "A private coastal estate where monolithic timber craftsmanship converges with limitless glass volumes and serene reflection pools.",
    scrollPrompt: "Scroll to step inside",
  },
  stage1: {
    tag: "01 // ARCHITECTURAL THRESHOLD",
    heading: "Step across \nthe boundary.",
    description:
      "A custom vertical slatted cedar facade conceals a pivot-hung entrance. As the door swings silently open, natural dawn floods the interior gallery, welcoming you into a space defined by balance and tranquility.",
    specs: [
      { label: "Western Red Cedar", value: "Hand-milled" },
      { label: "Sound Dampened 44dB", value: "Acoustic Glazing" },
    ],
  },
  stage2: {
    tag: "02 // POOLSIDE HORIZON",
    heading: "Boundaries dissolved \nin reflection.",
    description:
      "Floor-to-ceiling motorized sliding glass walls slide completely into pocket enclosures, uniting the open dining terrace with an azure infinity lap pool and sun-drenched gardens.",
    specs: [
      { label: "Heated Lap Pool", value: "65 Ft" },
      { label: "Granite Surround", value: "Zero Edge" },
    ],
  },
  stage3: {
    tag: "03 // THE GRAND LIVING SALON",
    heading: "Your private sanctuary \nawaits.",
    description:
      "Bespoke Italian walnut millwork, suspended ambient bronze fixtures, and uninterrupted panoramic garden windows create an unmatched sanctuary of modern luxury.",
    primaryButtonText: "Schedule Private Tour",
    secondaryButtonText: "Download Confidential Prospectus",
  },
};

export default function ProductScrollAnimation({
  totalFrames = 40,
  baseFrameUrl = "/assets/landing/ezgif-frame-",
  propertyTitle = "The Pavilion Residence",
  tagline = "Nest & Key • Architectural Archive",
  locationElevation = "ELEVATION: 34.09° N • PACIFIC VILLA",
  stages = DEFAULT_STAGES,
  objectFit = "cover",
  onOpenInquiry,
}: ProductScrollAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preloading states
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Active frame tracker for UI HUD
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);

  // In-memory frame cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Storytelling stages transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.10, 0.18], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -35]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);

  const feat1Opacity = useTransform(scrollYProgress, [0.20, 0.27, 0.38, 0.44], [0, 1, 1, 0]);
  const feat1Y = useTransform(scrollYProgress, [0.20, 0.27, 0.38, 0.44], [25, 0, 0, -25]);

  const feat2Opacity = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.72], [0, 1, 1, 0]);
  const feat2Y = useTransform(scrollYProgress, [0.48, 0.55, 0.65, 0.72], [25, 0, 0, -25]);

  const ctaOpacity = useTransform(scrollYProgress, [0.76, 0.83, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.76, 0.83, 1], [30, 0, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.76, 0.83, 1], [0.96, 1, 1]);

  const scrubBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /**
   * High performance canvas frame render function
   * Scales to cover full screen edge-to-edge without letterboxing or black bars.
   */
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // High DPI rendering capped at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width || window.innerWidth;
    const displayHeight = rect.height || window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Full-screen cover calculation: Math.max ensures full viewport coverage
    const scale = objectFit === "contain"
      ? Math.min(displayWidth / imgWidth, displayHeight / imgHeight)
      : Math.max(displayWidth / imgWidth, displayHeight / imgHeight);

    const drawWidth = Math.ceil(imgWidth * scale);
    const drawHeight = Math.ceil(imgHeight * scale);
    const drawX = Math.round((displayWidth - drawWidth) / 2);
    const drawY = Math.round((displayHeight - drawHeight) / 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [objectFit]);

  /**
   * Preload image sequence into memory
   */
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    setIsLoaded(false);
    setLoadedCount(0);
    setLoadPercentage(0);
    currentFrameIndexRef.current = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `${baseFrameUrl}${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        const pct = Math.round((loaded / totalFrames) * 100);
        setLoadPercentage(pct);

        if (loaded === totalFrames) {
          imagesRef.current = images;
          setIsLoaded(true);
          requestAnimationFrame(() => {
            renderFrame(0);
          });
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          imagesRef.current = images;
          setIsLoaded(true);
          requestAnimationFrame(() => {
            renderFrame(0);
          });
        }
      };

      images.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames, baseFrameUrl, renderFrame]);

  /**
   * Synchronous native scroll listener for 60fps frame scrubbing
   */
  useEffect(() => {
    if (!isLoaded || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      const rawIndex = Math.floor(progress * totalFrames);
      const targetIndex = Math.max(0, Math.min(totalFrames - 1, rawIndex));

      if (targetIndex !== currentFrameIndexRef.current) {
        currentFrameIndexRef.current = targetIndex;

        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          renderFrame(targetIndex);
          setActiveFrameDisplay(targetIndex + 1);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoaded, totalFrames, shouldReduceMotion, renderFrame]);

  /**
   * Responsive resize and orientation change handling
   */
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        renderFrame(currentFrameIndexRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isLoaded, renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      {/* Minimalist Awwwards Preloader Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none px-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-mono">
                  {tagline}
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white/95 mb-8">
                {propertyTitle}
              </h2>

              <div className="flex flex-col items-center gap-3">
                <div className="w-56 md:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-200/80 via-white to-amber-100"
                    style={{ width: `${loadPercentage}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between w-56 md:w-72 text-[12px] font-mono text-white/40">
                  <span>PRELOADING FRAMES</span>
                  <span>{loadPercentage}%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY VIEWPORT CONTAINER (100vh / 100dvh) - Full bleed edge-to-edge */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#050505] z-0">
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block bg-[#050505] object-cover"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Soft edge vignette to ensure seamless blend into #050505 */}
        <div className="canvas-seamless-vignette absolute inset-0 z-10 pointer-events-none" />

        {/* Cinematic gradients for contrast without darkening main frame view */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/85 via-[#050505]/30 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505]/85 via-[#050505]/30 to-transparent pointer-events-none z-10" />

        {/* TOP HUD INFO */}
        <div className="absolute top-0 inset-x-0 z-20 pointer-events-none p-6 md:p-12 lg:p-16 pt-20 md:pt-24 flex justify-between items-start text-xs font-mono tracking-widest text-white/40 uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>INTERACTIVE WALKTHROUGH</span>
          </div>
          <div className="hidden sm:block">
            <span>{locationElevation}</span>
          </div>
        </div>

        {/* STAGE 1: HERO OVERLAY */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6 md:p-12"
        >
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-6 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-white/80 font-mono">
                {stages.hero.badge}
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter text-white leading-[1.05] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {stages.hero.titlePrimary} <br className="hidden sm:inline" />
              <span className="italic font-serif font-normal text-white/90">
                {stages.hero.titleItalic}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl leading-relaxed tracking-tight mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {stages.hero.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/60 animate-pulse drop-shadow">
              <ChevronDown className="w-4 h-4" />
              <span>{stages.hero.scrollPrompt}</span>
            </div>
          </div>
        </motion.div>

        {/* STAGE 2: FEATURE 1 OVERLAY */}
        <motion.div
          style={{ opacity: feat1Opacity, y: feat1Y }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-start p-6 md:p-16 lg:p-24"
        >
          <div className="max-w-xl text-left bg-black/45 md:bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 tracking-widest uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{stages.stage1.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-4 whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {stages.stage1.heading}
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-6">
              {stages.stage1.description}
            </p>
            <div className="flex items-center gap-6 text-xs font-mono text-white/60">
              {stages.stage1.specs.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="w-[1px] h-6 bg-white/20" />}
                  <div>
                    <span className="block text-white text-sm font-sans font-medium">{item.value}</span>
                    {item.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* STAGE 3: FEATURE 2 OVERLAY */}
        <motion.div
          style={{ opacity: feat2Opacity, y: feat2Y }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end p-6 md:p-16 lg:p-24"
        >
          <div className="max-w-xl text-right bg-black/45 md:bg-black/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-end gap-2 text-xs font-mono text-amber-300 tracking-widest uppercase mb-3">
              <span>{stages.stage2.tag}</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight mb-4 whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {stages.stage2.heading}
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mb-6">
              {stages.stage2.description}
            </p>
            <div className="flex items-center justify-end gap-6 text-xs font-mono text-white/60">
              {stages.stage2.specs.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="w-[1px] h-6 bg-white/20" />}
                  <div>
                    <span className="block text-white text-sm font-sans font-medium">{item.value}</span>
                    {item.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* STAGE 4: FINAL CTA OVERLAY */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-6 md:p-12"
        >
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center pointer-events-auto bg-black/50 md:bg-black/35 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 tracking-[0.25em] uppercase mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>{stages.stage3.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tighter text-white leading-tight mb-5 whitespace-pre-line drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {stages.stage3.heading}
            </h2>

            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-lg mb-8 drop-shadow">
              {stages.stage3.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-amber-100 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{stages.stage3.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-md text-white hover:text-white hover:border-white/50 text-sm font-light tracking-wide transition-all duration-300 cursor-pointer"
              >
                {stages.stage3.secondaryButtonText}
              </button>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM STATUS BAR HUD */}
        <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none p-6 md:p-12 lg:p-16">
          <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                SCENE {String(activeFrameDisplay).padStart(2, "0")} / {totalFrames}
              </span>
              <div className="hidden sm:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono text-white/30">
                  {totalFrames > 50 ? "1920 × 1080 FULL HD" : "1280 × 720 HD"}
                </span>
              </div>
            </div>

            {/* Visual scrub bar */}
            <div className="flex-1 max-w-xs sm:max-w-md h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-400"
                style={{ width: scrubBarWidth }}
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 uppercase tracking-widest">
              <span>NEST &amp; KEY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
