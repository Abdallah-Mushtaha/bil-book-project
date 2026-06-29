"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function AboutBook() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bookRotate = useTransform(scrollYProgress, [0, 1], [8, -4]);

  return (
    <section ref={ref} className="py-24 md:py-40 bg-[#0a0304] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Book Component - حافظت عليه كما هو */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.div
            style={{ rotate: bookRotate }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/B0oks.png"
              alt="Secure Love Book"
              width={400}
              height={600}
              className="w-full max-w-[280px] md:max-w-md scale-100 md:scale-125 -rotate-6 md:-rotate-12 hover:rotate-0 transition-transform duration-700 ease-out drop-shadow-[0_40px_80px_rgba(139,26,26,0.5)]"
            />
          </motion.div>
        </motion.div>

        {/* Text Section - تطبيق الخطوط المطلوبة */}
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

          <ul className="mt-10 space-y-4">
            {[
              "Identify your attachment patterns",
              "Master healthy communication",
              "Resolve conflict with empathy",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white font-medium"
              >
                <span className="text-red-600">✓</span>
                <span className="text-sm font-body-serif">{item}</span>
              </li>
            ))}
          </ul>

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
