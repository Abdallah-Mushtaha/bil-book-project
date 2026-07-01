"use client";

import HTMLFlipBook from "react-pageflip";
import { useRef, useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type BookPageProps = {
  src: string;
  pageNumber: number;
};

const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ src, pageNumber }, ref) => (
    <div
      ref={ref}
      className="relative w-full h-full bg-black/20 backdrop-blur-sm"
    >
      <Image
        src={src}
        alt={`Page ${pageNumber}`}
        fill
        className="object-cover opacity-90"
        priority={pageNumber <= 2}
      />
    </div>
  ),
);
BookPage.displayName = "BookPage";

const TOTAL_PAGES = 5;
const PAGE_RATIO = 450 / 600;
const DESKTOP_BREAKPOINT = 1024;

export default function PreviewBook() {
  const bookRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 300, height: 450 });
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    // المسار الصحيح بناءً على هيكلية المجلدات لديك
    audioRef.current = new Audio("/sound/page_flip.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio playback failed:", err));
    }
  };

  useEffect(() => {
    function calcSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isDesktop = vw >= DESKTOP_BREAKPOINT;

      setIsPortrait(!isDesktop);

      const reservedHeight = vw < 640 ? 220 : 280;
      const horizontalPadding = vw < 640 ? 24 : 64;

      const maxW = vw - horizontalPadding;
      const maxH = vh - reservedHeight;

      let width, height;

      if (isDesktop) {
        width = Math.min(maxW / 2, 500);
        height = width / PAGE_RATIO;
      } else {
        width = Math.min(maxW, 500);
        height = width / PAGE_RATIO;
      }

      setDimensions({
        width: Math.max(220, width),
        height: Math.max(300, height),
      });
    }

    calcSize();
    window.addEventListener("resize", calcSize);
    return () => window.removeEventListener("resize", calcSize);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-3 py-6 sm:p-8">
      <h1 className="mb-4 sm:mb-12 mt-8 sm:mt-0 text-white/50 text-xs sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase text-center px-4">
        Book preview — Secure Love
      </h1>

      <div className="relative filter drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]">
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={isPortrait ? "portrait" : "spread"}
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          usePortrait={isPortrait}
          minWidth={220}
          maxWidth={500}
          minHeight={300}
          maxHeight={700}
          showCover={false}
          drawShadow={true}
          flippingTime={800}
          onFlip={(e: any) => {
            setCurrentPage(e.data);
            playFlipSound();
          }}
          className="mx-auto"
        >
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <BookPage
              key={i}
              src={`/preview/page${i + 1}.png`}
              pageNumber={i + 1}
            />
          ))}
        </HTMLFlipBook>
      </div>

      <div className="mt-5 sm:mt-8 text-white/40 font-light tracking-widest text-sm sm:text-base">
        {currentPage + 1} / {TOTAL_PAGES}
      </div>

      {currentPage === TOTAL_PAGES - 1 && (
        <div className="mt-4 sm:mt-6">
          <motion.button
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 text-sm tracking-[0.12em] uppercase rounded-full transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--gray-light)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              cursor: "pointer",
              marginTop: "1rem",
            }}
            onClick={() => router.push("/checkout")}
          >
            Buy Book <span className="text-base">→</span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
