import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AUTHOR_IMAGE_MASK } from "./Hero.constants";
import type { AuthorVisualProps } from "./Hero.types";

function AuthorVisualComponent({ authorY, bookY }: AuthorVisualProps) {
  return (
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
          src="/authorr.png"
          alt="Author"
          fill
          className="object-cover object-top"
          style={{
            maskImage: AUTHOR_IMAGE_MASK,
            WebkitMaskImage: AUTHOR_IMAGE_MASK,
            WebkitMaskComposite: "destination-in",
            maskComposite: "intersect",
          }}
          priority
        />
      </motion.div>

      <motion.div
        style={{ y: bookY }}
        className="absolute z-30 pointer-events-none inset-x-0 top-10 md:right-10 md:bottom-10 md:top-auto hidden md:flex justify-center md:justify-start"
        initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto md:mx-0"
          style={{ width: "clamp(150px, 40vw, 340px)" }}
        >
          <Image
            src="/B0oks.png"
            alt="Because I Loved - Book"
            width={240}
            height={210}
            className="drop-shadow-2xl w-full h-auto"
            style={{
              filter: "drop-shadow(0 30px 60px rgba(139,26,26,0.35))",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export const AuthorVisual = memo(AuthorVisualComponent);
