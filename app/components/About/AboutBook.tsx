"use client";

import { useRef } from "react";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FeaturesList } from "./FeatureList";
import { BookImage } from "./BookDisplay";

export default function AboutBook() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bookRotate = useTransform(scrollYProgress, [0, 1], [8, -4]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-40 bg-[#0a0304] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <BookImage inView={inView} bookRotate={bookRotate} />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-red-600 font-bold">
              About the book
            </span>
            <span className="w-12 h-[1px] bg-red-600/50"></span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Secure{" "}
            <span className="italic text-red-600 block md:inline">Love</span>
          </h2>

          <div className="font-body-serif space-y-6 text-gray-400 text-lg leading-relaxed max-w-md">
            <p>
              Secure Love is a practical guide to understanding attachment
              theory, designed to help you navigate emotional safety and build
              relationships that truly last.
            </p>
            <p>
              Julie Menanno combines clinical expertise with actionable steps to
              transform how you communicate and connect with your partner.
            </p>
          </div>

          <FeaturesList />

          <div className="mt-12 flex items-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-red-600 hover:text-white transition-all duration-400 cursor-pointer">
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
