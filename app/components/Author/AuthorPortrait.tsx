import Image from "next/image";
import { motion } from "framer-motion";

export const AuthorPortrait = ({ inView }: { inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={inView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    className="relative px-6 md:px-0 w-full max-w-sm mx-auto"
  >
    <div className="relative">
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
);
