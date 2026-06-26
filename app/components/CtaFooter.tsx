"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function CtaFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA Section */}
      <section
        ref={ref}
        className="py-16 md:py-32 px-4 relative overflow-hidden text-center mt-4"
        style={{ background: "#0a0304" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(139,26,26,0.15) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 md:mb-12 flex justify-center"
            >
              <Image
                src="/book.png"
                alt="Because I Loved"
                width={300}
                height={450}
                className="w-2/3 md:w-[300px] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-out drop-shadow-[0_20px_40px_rgba(139,26,26,0.3)] md:drop-shadow-[0_40px_80px_rgba(139,26,26,0.5)]"
              />
            </motion.div>

            <p
              className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.35em] uppercase mb-4 md:mb-5"
              style={{ color: "var(--crimson)" }}
            >
              Experience the book
            </p>
            <h2
              className="font-display text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2"
              style={{ color: "var(--off-white)" }}
            >
              Begin the{" "}
              <em className="italic" style={{ color: "var(--crimson)" }}>
                journey
              </em>
            </h2>
            <p
              className="font-body-serif text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto px-6"
              style={{ color: "var(--gray-mid)" }}
            >
              Available now wherever books are sold. Start reading today.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 px-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(139,26,26,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-[280px] py-3.5 text-sm tracking-[0.18em] uppercase font-medium rounded-full transition-all duration-300"
                style={{
                  background: "rgba(139,26,26,0.5)",
                  border: "1px solid rgba(192,57,43,0.7)",
                  color: "var(--off-white)",
                  backdropFilter: "blur(16px)",
                  boxShadow:
                    "0 4px 28px rgba(139,26,26,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                Order Now
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.04,
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-[280px] py-3.5 text-sm tracking-[0.16em] uppercase font-medium rounded-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "var(--off-white)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Download Free Chapter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-4 border-t"
        style={{
          background: "var(--black)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          <p
            className="font-display italic text-lg"
            style={{ color: "var(--off-white)" }}
          >
            Zahraa Naserelddine
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {["Privacy Policy", "Contact", "Who Designed This?"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] md:text-xs tracking-wide uppercase transition-colors duration-200"
                style={{ color: "var(--gray-mid)" }}
              >
                {link}
              </a>
            ))}
          </div>
          <p
            className="text-[11px] md:text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © 2025 Zahraa Naserelddine
          </p>
        </div>
      </footer>
    </>
  );
}
