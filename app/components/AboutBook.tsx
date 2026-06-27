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
    // تم تغيير px-8 إلى px-4 لضمان عدم الالتصاق بالأطراف على الموبايل
    <section
      id="the-book"
      ref={ref}
      className="py-32 px-4 relative overflow-hidden "
      style={{ background: "#0a0304" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(139,26,26,0.12) 0%, transparent 60%)",
        }}
      />

      {/* تم تحسين الـ grid ليكون متجاوباً بشكل أفضل مع المسافات */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        {/* Book */}
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
              src="/book.png"
              alt="Because I Loved"
              width={400}
              height={600}
              className="w-full max-w-[280px] md:max-w-md scale-100 md:scale-125 -rotate-6 md:-rotate-12 hover:rotate-0 transition-transform duration-700 ease-out drop-shadow-[0_40px_80px_rgba(139,26,26,0.5)]"
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "var(--crimson)" }}
          >
            About the book
          </p>
          <h2
            className="font-display text-4xl md:text-6xl font-bold mb-3 leading-tight"
            style={{ color: "var(--off-white)" }}
          >
            Because I
          </h2>
          <h2
            className="font-display italic text-4xl md:text-6xl font-bold mb-10 leading-tight"
            style={{ color: "var(--crimson)" }}
          >
            Loved
          </h2>

          <div
            className="space-y-5 font-body-serif text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--gray-light)" }}
          >
            <p>
              Some loves do not end with a door closing. They end long before —
              in the silence between two people who once knew everything about
              each other.
            </p>
            <p>
              This is a story of a woman who must learn that loving fiercely
              does not guarantee staying, and that letting go may be the truest
              act of devotion.
            </p>
            <p style={{ color: "var(--gray-mid)", fontSize: "1rem" }}>
              Lyrical, unflinching, and achingly tender — a debut that lingers
              long after the last page.
            </p>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(139,26,26,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-sm tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300 w-full md:w-auto"
              style={{
                background: "rgba(139,26,26,0.5)",
                border: "1px solid rgba(192,57,43,0.7)",
                color: "var(--off-white)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  "0 4px 24px rgba(139,26,26,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              Order Book
            </motion.button>

            <div className="flex gap-4 items-center">
              {["Amazon", "Walmart"].map((store) => (
                <motion.span
                  key={store}
                  whileHover={{ color: "var(--off-white)" }}
                  className="text-xs tracking-wide uppercase cursor-pointer transition-colors duration-200 px-3 py-1.5 rounded-full"
                  style={{
                    color: "var(--gray-mid)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {store}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
