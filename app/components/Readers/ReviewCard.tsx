import { reviews } from "./Readers.constants";
import { motion } from "framer-motion";

export const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
  <motion.div
    key={review.name}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
    className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-12 shadow-2xl flex flex-col items-center text-center"
  >
    <div
      className="text-6xl mb-6 opacity-30"
      style={{ color: "var(--crimson)", fontFamily: "var(--font-display)" }}
    >
      "
    </div>
    <p
      className="font-body-serif text-xl md:text-3xl italic leading-relaxed mb-10"
      style={{ color: "var(--off-white)" }}
    >
      {review.quote}
    </p>
    <div className="flex items-center gap-4 mt-auto">
      <img
        src={review.image}
        alt={review.name}
        className="w-16 h-16 rounded-full border-2 object-cover"
        style={{ borderColor: "var(--crimson)" }}
      />
      <div className="text-left">
        <p className="font-bold" style={{ color: "var(--off-white)" }}>
          {review.name}
        </p>
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--gray-mid)" }}
        >
          {review.source}
        </p>
      </div>
    </div>
  </motion.div>
);
