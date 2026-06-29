"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function Author() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="author"
      ref={ref}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      style={{ background: "#070103" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.1) 0%, transparent 55%)",
        }}
      />

      {/* استخدام flex-col-reverse في الموبايل لجعل الصورة أولاً */}
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <div
            className="inline-flex items-center rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase"
            style={{
              background: "rgba(139,26,26,0.15)",
              border: "1px solid rgba(192,57,43,0.4)",
              color: "var(--crimson)",
            }}
          >
            Demo Content • Fictional Author
          </div>
          <h2
            className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "var(--off-white)" }}
          >
            Emily <br />
            <em className="italic" style={{ color: "var(--crimson)" }}>
              Carter
            </em>
          </h2>

          <div
            className="space-y-4 font-body-serif text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--gray-light)" }}
          >
            <p>
              Emily Carter is a fictional author created exclusively for this
              demo landing page. The biography, image, and content shown here
              are placeholders.
            </p>
            <p className="hidden md:block">
              This section illustrates how an author's profile could be
              presented, including a short biography, featured publication, and
              personal quote.
            </p>
          </div>

          <div
            className="border-l-2 pl-4 py-1 mx-auto md:mx-0 max-w-lg"
            style={{ borderColor: "var(--crimson)" }}
          >
            <p
              className="font-body-serif text-base md:text-lg italic leading-relaxed"
              style={{ color: "var(--gray-mid)" }}
            >
              "Every great story begins with a single idea and the courage to
              share it."
            </p>
          </div>
        </motion.div>

        {/* Portrait Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative px-6 md:px-0 w-full max-w-sm mx-auto"
        >
          <div className="relative">
            {/* Animated Border */}
            <div className="absolute -inset-[3px] z-0 rounded-[24px] overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,var(--crimson),transparent_50%,var(--crimson))]"
              />
            </div>

            <div className="relative z-10 rounded-[20px] overflow-hidden bg-black p-[2px]">
              <Image
                src="/authorr.png"
                alt="Demo Author Portrait"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-[18px]"
                style={{
                  filter: "grayscale(20%) contrast(1.05)",
                  aspectRatio: "4/5",
                }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-2 md:-right-5 px-4 py-3 rounded-xl z-20"
              style={{
                background: "rgba(139,26,26,0.8)",
                border: "1px solid rgba(192,57,43,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <p className="font-display text-sm font-bold text-white">
                Debut Author
              </p>
              <p
                className="text-[10px] uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Portfolio Demo
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
