"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ReviewCard } from "./ReviewCard";
import { NavigationDots } from "./NavigationDots";
import { reviews } from "./Readers.constants";

export default function Readers() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="readers"
      className="py-32 px-4 relative overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,26,26,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "var(--crimson)" }}
          >
            Reader Reviews
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--off-white)" }}
          >
            Loved by{" "}
            <em className="italic" style={{ color: "var(--crimson)" }}>
              Readers
            </em>
          </h2>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <ReviewCard review={reviews[active]} />
          </AnimatePresence>
        </div>

        <NavigationDots active={active} setActive={setActive} />
      </div>
    </section>
  );
}
