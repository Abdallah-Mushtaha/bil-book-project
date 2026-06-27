"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
  {
    quote:
      "A novel that broke me open and then stitched me back together with its final words.",
    name: "Lina A.",
    source: "Goodreads",
    stars: 5,
  },
  {
    quote:
      "I haven't cried this much reading since I was seventeen. Zahraa writes grief like she's lived every word.",
    name: "Mariam K.",
    source: "Instagram",
    stars: 5,
  },
  {
    quote:
      "Hauntingly beautiful. Every chapter is a quiet devastation you surrender to willingly.",
    name: "Sara R.",
    source: "Book Club Review",
    stars: 5,
  },
  {
    quote:
      "This is the kind of story that doesn't leave you. I found myself thinking about the characters weeks later.",
    name: "Nour T.",
    source: "Amazon Review",
    stars: 5,
  },
];

export default function Readers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    // تم تغيير px-8 إلى px-4 لضمان عدم الالتصاق بالأطراف على الموبايل
    <section
      id="readers"
      ref={ref}
      className="py-32 px-4 relative overflow-hidden "
      style={{ background: "var(--black)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,26,26,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "var(--crimson)" }}
          >
            What readers say
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--off-white)" }}
          >
            Voices from the{" "}
            <em className="italic" style={{ color: "var(--crimson)" }}>
              readers
            </em>
          </h2>
        </motion.div>

        {/* Main review card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-[300px]"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                y: i === active ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              style={{ pointerEvents: i === active ? "auto" : "none" }}
            >
              {/* Quote mark */}
              <div
                className="font-display text-6xl md:text-8xl leading-none mb-4"
                style={{ color: "var(--crimson)", opacity: 0.3 }}
              >
                "
              </div>
              <p
                className="font-body-serif text-xl md:text-3xl italic leading-relaxed mb-8 max-w-3xl"
                style={{ color: "var(--off-white)" }}
              >
                {review.quote}
              </p>
              <div className="flex gap-1 mb-4">
                {[...Array(review.stars)].map((_, s) => (
                  <span key={s} style={{ color: "var(--crimson)" }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                className="text-sm tracking-widest uppercase"
                style={{ color: "var(--gray-mid)" }}
              >
                {review.name} · {review.source}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots nav */}
        <div className="flex justify-center gap-3 mt-16">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width: i === active ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor:
                  i === active ? "var(--crimson)" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
