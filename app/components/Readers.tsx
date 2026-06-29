"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    quote:
      "One of the most practical relationship books I've ever read. It completely changed how I understand attachment.",
    name: "Emily R.",
    source: "Amazon",
    stars: 5,
    image: "https://i.pravatar.cc/100?u=1",
  },
  {
    quote:
      "Julie Menanno explains complex relationship patterns in a simple, compassionate, and actionable way.",
    name: "David L.",
    source: "Goodreads",
    stars: 5,
    image: "https://i.pravatar.cc/100?u=2",
  },
  {
    quote:
      "Every couple should read this book. The communication techniques alone are worth it.",
    name: "Sophia M.",
    source: "Barnes & Noble",
    stars: 5,
    image: "https://i.pravatar.cc/100?u=3",
  },
  {
    quote:
      "Insightful, practical, and deeply reassuring. Secure Love gave me a completely new perspective on healthy relationships.",
    name: "Jessica T.",
    source: "Reader Review",
    stars: 5,
    image: "https://i.pravatar.cc/100?u=4",
  },
];

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
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-12 shadow-2xl flex flex-col items-center text-center"
            >
              <div
                className="text-6xl mb-6 opacity-30"
                style={{
                  color: "var(--crimson)",
                  fontFamily: "var(--font-display)",
                }}
              >
                "
              </div>

              <p
                className="font-body-serif text-xl md:text-3xl italic leading-relaxed mb-10"
                style={{ color: "var(--off-white)" }}
              >
                {reviews[active].quote}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={reviews[active].image}
                  alt={reviews[active].name}
                  className="w-16 h-16 rounded-full border-2 object-cover"
                  style={{ borderColor: "var(--crimson)" }}
                />
                <div className="text-left">
                  <p
                    className="font-bold"
                    style={{ color: "var(--off-white)" }}
                  >
                    {reviews[active].name}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--gray-mid)" }}
                  >
                    {reviews[active].source}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === active ? "40px" : "10px",
                height: "10px",
                backgroundColor:
                  i === active ? "var(--crimson)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
