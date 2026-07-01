import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { LETTER_VARIANTS } from "./Hero.constants";
import type { AnimatedTitleProps } from "./Hero.types";

/**
 * Renders `text` as a sequence of letters that fade/slide in one by one.
 * `startIndex` offsets the animation delay so a second line can continue
 * the stagger from where the first line left off.
 */
function AnimatedTitleComponent({
  text,
  startIndex = 0,
  italic = false,
  color,
  wrapperClassName = "mb-1",
}: AnimatedTitleProps) {
  const characters = useMemo(() => text.split(""), [text]);

  return (
    <div className={`overflow-hidden ${wrapperClassName}`}>
      <div className={italic ? "flex gap-0" : "flex gap-3 flex-wrap"}>
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={startIndex + i}
            initial="hidden"
            animate="visible"
            variants={LETTER_VARIANTS}
            className={`font-display ${
              italic ? "italic" : ""
            } text-5xl sm:text-6xl md:text-8xl font-bold leading-none`}
            style={{ color, letterSpacing: "-0.02em" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export const AnimatedTitle = memo(AnimatedTitleComponent);
