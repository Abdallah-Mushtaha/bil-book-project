"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const audiences = [
  {
    icon: "/books.png",
    label: "Reads deeply",
    desc: "For those who live inside stories",
    shadow: "0px 0px 20px rgba(200, 180, 150, 0.4)", // لون دافئ للكتاب
  },
  {
    icon: "/Moon.png",
    label: "Feels intensely",
    desc: "For those who love with everything",
    shadow: "0px 0px 20px rgba(255, 215, 0, 0.4)", // لون ذهبي للقمر
  },
  {
    icon: "/brokenHeart.png",
    label: "Has loved and lost",
    desc: "For those who know the weight of goodbye",
    shadow: "0px 0px 20px rgba(220, 20, 60, 0.5)", // لون أحمر للقلب
  },
  {
    icon: "/Pen.png",
    label: "Chases beauty",
    desc: "For those who find truth in literature",
    shadow: "0px 0px 20px rgba(100, 200, 255, 0.4)", // لون أزرق خفيف للقلم
  },
];

export default function WhoIsItFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 px-8 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] uppercase mb-4 text-[var(--crimson)]">
            Who is this for?
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-[var(--off-white)]">
            This book is for{" "}
            <em className="italic text-[var(--crimson)]">you</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {audiences.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group p-8 text-center rounded-2xl transition-all duration-300 cursor-default border border-white/[0.06] bg-white/[0.03] backdrop-blur-[8px] hover:bg-[rgba(139,26,26,0.1)] hover:border-[rgba(139,26,26,0.3)]"
            >
              <div className="mb-8 transition-transform duration-500 ease-out group-hover:scale-110">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-20 h-20 mx-auto object-contain transition-all duration-500"
                  style={{ filter: `drop-shadow(${item.shadow})` }}
                />
              </div>
              <p className="font-display text-base font-semibold mb-2 text-[var(--off-white)]">
                {item.label}
              </p>
              <p className="text-sm leading-relaxed text-[var(--gray-mid)]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
