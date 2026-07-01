import { memo } from "react";
import { motion } from "framer-motion";
import { SCROLL_LINE_GRADIENT } from "./Hero.constants";
import PreviewBook from "@/app/preview/page";

function ScrollIndicatorComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -10, 0] }} //
      transition={{
        opacity: { delay: 2, duration: 1 },
        y: { delay: 2, duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute -bottom-11 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      <span
        className="text-xs tracking-[0.3em] uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        style={{ color: "#e5e7eb" }}
      >
        Scroll
      </span>

      <div className="w-full h-full max-h-[100dvh] flex text-red-400 justify-center items-center">
        |
      </div>

      <div className="w-px h-12" style={{ background: SCROLL_LINE_GRADIENT }} />
    </motion.div>
  );
}

export const ScrollIndicator = memo(ScrollIndicatorComponent);
