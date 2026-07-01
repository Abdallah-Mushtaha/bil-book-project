"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "./components/HeroBackground";
import { AuthorVisual } from "./components/AuthorVisual";
import { HeroText } from "./components/HeroText";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { PreviewModal } from "./components/PreviewModal";
import { HERO_BACKGROUND_GRADIENT } from "./components/Hero.constants";

export default function Hero() {
  const [showPreview, setShowPreview] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const authorY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bookY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const openPreview = useCallback(() => setShowPreview(true), []);
  const closePreview = useCallback(() => setShowPreview(false), []);

  // Lock page scroll while the preview modal is open.
  useEffect(() => {
    document.body.style.overflow = showPreview ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreview]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: HERO_BACKGROUND_GRADIENT }}
    >
      <PreviewModal isOpen={showPreview} onClose={closePreview} />

      <HeroBackground />

      <AuthorVisual authorY={authorY} bookY={bookY} />

      <HeroText textY={textY} opacity={opacity} onPreviewClick={openPreview} />

      <ScrollIndicator />
    </section>
  );
}
