"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const authorY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bookY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.7, ease: "easeOut" as const },
    }),
  };

  const title1 = "Because I";
  const title2 = "Loved";

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.04) 0%, transparent 50%)",
        }}
      />

      <motion.div
        style={{ y: authorY }}
        className="absolute right-0 top-0 bottom-0 w-1/2 z-10 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src="/author.png"
            alt="Author"
            fill
            className="object-cover object-top"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.9) 80%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.9) 80%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent 100%)",
              WebkitMaskComposite: "destination-in",
              maskComposite: "intersect",
            }}
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-8 w-full"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs tracking-[0.35em] uppercase mb-8"
            style={{ color: "var(--crimson)" }}
          >
            A Debut Novel
          </motion.p>

          <div className="overflow-hidden mb-1">
            <div className="flex gap-3 flex-wrap">
              {title1.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-none"
                  style={{
                    color: "var(--off-white)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden mb-10">
            <div className="flex gap-0">
              {title2.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={title1.length + i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="font-display italic  text-5xl sm:text-6xl md:text-8xl font-bold leading-none"
                  style={{ color: "var(--crimson)", letterSpacing: "-0.02em" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-body-serif text-xl leading-relaxed mb-10 max-w-md"
            style={{ color: "var(--gray-light)" }}
          >
            A story woven from loss and longing — where every goodbye quietly
            reshapes what it means to truly love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(139,26,26,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3  text-sm tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300"
              style={{
                background: "rgba(139,26,26,0.5)",
                border: "1px solid rgba(192,57,43,0.7)",
                color: "var(--off-white)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  "0 4px 24px rgba(139,26,26,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              Order Now
            </motion.button>

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
              }}
            >
              Read Sample
              <span className="text-base">→</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: bookY }}
        className="absolute z-30 pointer-events-none hidden md:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{
            right: "-52vw",
            top: "10vh",
            width: "clamp(200px, 22vw, 340px)",
          }}
        >
          <Image
            src="/book.png"
            alt="Because I Loved - Book"
            width={340}
            height={510}
            className="drop-shadow-2xl w-full h-auto"
            style={{ filter: "drop-shadow(0 30px 60px rgba(139,26,26,0.35))" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute -bottom-11 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--gray-mid)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, var(--crimson), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
