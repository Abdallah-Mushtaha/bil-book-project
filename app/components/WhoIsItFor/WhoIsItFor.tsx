"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { audiences } from "./audiences";
import { MobileCard } from "./MobileCard";
import { DesktopCard } from "./DesktopCard";
export default function WhoIsItFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-book" ref={ref} className="py-32 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] uppercase mb-4 text-[var(--crimson)]">
            Who is this for?
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[var(--off-white)]">
            This book is for{" "}
            <em className="italic text-[var(--crimson)]">you</em>
          </h2>
        </motion.div>

        {/* 1. تصميم الكمبيوتر (Desktop) */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {audiences.map((item) => (
            <DesktopCard key={item.label} item={item} />
          ))}
        </div>

        {/* 2. تصميم الموبايل (Mobile) */}
        <div className="md:hidden flex flex-col gap-4">
          {audiences.map((item) => (
            <MobileCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
