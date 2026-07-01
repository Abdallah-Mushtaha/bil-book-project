"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const BookImage = ({
  inView,
  bookRotate,
}: {
  inView: boolean;
  bookRotate: any;
}) => (
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
        src="/B0oks.png"
        alt="Secure Love Book"
        width={400}
        height={600}
        className="w-full max-w-[280px] md:max-w-md scale-100 md:scale-125 -rotate-6 md:-rotate-12 hover:rotate-0 transition-transform duration-700 ease-out drop-shadow-[0_40px_80px_rgba(139,26,26,0.5)]"
      />
    </motion.div>
  </motion.div>
);
