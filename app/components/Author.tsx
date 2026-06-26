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
      className="py-32 px-8 relative overflow-hidden"
      style={{ background: "#070103" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.1) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "var(--crimson)" }}
          >
            About the author
          </p>
          <h2
            className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight"
            style={{ color: "var(--off-white)" }}
          >
            Zahraa
            <br />
            <em className="italic" style={{ color: "var(--crimson)" }}>
              Naserelddine
            </em>
          </h2>

          <div
            className="space-y-5 font-body-serif text-xl leading-relaxed mb-10"
            style={{ color: "var(--gray-light)" }}
          >
            <p>
              Zahraa Naserelddine is a writer drawn to the quiet spaces between
              what is said and what is felt. Her work explores love, identity,
              and the quiet revolutions that happen inside a person.
            </p>
            <p>
              <em>Because I Loved</em> is her debut novel — a story she carried
              for years before finding the words worthy of it.
            </p>
          </div>

          <div
            className="border-l-2 pl-6 py-1"
            style={{ borderColor: "var(--crimson)" }}
          >
            <p
              className="font-body-serif text-lg italic leading-relaxed"
              style={{ color: "var(--gray-mid)" }}
            >
              "I write because silence has never been enough to hold everything
              I've needed to say."
            </p>
          </div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto max-w-sm">
            <div
              className="absolute -inset-1 z-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--crimson) 0%, transparent 60%)",
              }}
            />
            <div
              className="relative z-10 rounded-2xl overflow-hidden"
              style={{ background: "var(--black)", padding: "3px" }}
            >
              <Image
                src="/author.png"
                alt="Zahraa Naserelddine"
                width={400}
                height={500}
                className="w-full object-cover rounded-xl"
                style={{
                  filter: "grayscale(20%) contrast(1.05)",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 px-5 py-3 rounded-xl z-10"
              style={{
                background: "rgba(139,26,26,0.6)",
                border: "1px solid rgba(192,57,43,0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 8px 30px rgba(139,26,26,0.3)",
              }}
            >
              <p
                className="font-display text-sm font-bold tracking-wide"
                style={{ color: "var(--off-white)" }}
              >
                Debut Author
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Because I Loved, 2025
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
