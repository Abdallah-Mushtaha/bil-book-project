"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const audiences = [
  {
    icon: "/books.png",
    label: "Understand Attachment",
    desc: "Discover how attachment styles shape every relationship.",
    shadow: "0px 0px 20px rgba(200, 180, 150, 0.4)",
  },
  {
    icon: "/Moon.png",
    label: "Find Emotional Safety",
    desc: "Build trust, security, and lasting emotional connections.",
    shadow: "0px 0px 20px rgba(255, 215, 0, 0.4)",
  },
  {
    icon: "/brokenHeart.png",
    label: "Heal Past Patterns",
    desc: "Break unhealthy cycles and grow stronger together.",
    shadow: "0px 0px 20px rgba(220, 20, 60, 0.5)",
  },
  {
    icon: "/Pen.png",
    label: "Communicate Better",
    desc: "Learn practical tools for honest and healthy conversations.",
    shadow: "0px 0px 20px rgba(100, 200, 255, 0.4)",
  },
];
export default function WhoIsItFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 px-4 bg-black">
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

        {/* 1. تصميم الكمبيوتر (Desktop) - يظهر فقط في الشاشات md فما فوق */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {audiences.map((item, i) => (
            <motion.div
              key={item.label}
              className="group p-8 text-center rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-[8px]"
            >
              <div className="mb-8">
                <img
                  src={item.icon}
                  className="w-20 h-20 mx-auto"
                  style={{ filter: `drop-shadow(${item.shadow})` }}
                />
              </div>
              <p className="font-display text-base font-semibold mb-2 text-[var(--off-white)]">
                {item.label}
              </p>
              <p className="text-sm text-[var(--gray-mid)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 2. تصميم الموبايل (Mobile) - يظهر فقط في الشاشات الصغيرة */}
        <div className="md:hidden flex flex-col gap-4">
          {audiences.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]"
            >
              <img
                src={item.icon}
                className="w-12 h-12"
                style={{ filter: `drop-shadow(${item.shadow})` }}
              />
              <div className="text-left">
                <p className="text-sm font-bold text-[var(--off-white)]">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--gray-mid)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
