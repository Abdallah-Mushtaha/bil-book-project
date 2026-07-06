import { memo } from "react";
import { motion } from "framer-motion";
import { AnimatedTitle } from "./Animatedtitle";
import {
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
  HERO_DESCRIPTION,
  HERO_EYEBROW,
  HERO_TITLE_LINE_1,
  HERO_TITLE_LINE_2,
} from "./Hero.constants";
import type { HeroTextProps } from "./Hero.types";
import Link from "next/link";
import { CheckoutButton } from "../../shared/CheckoutButton";

function HeroTextComponent({ textY, opacity, onPreviewClick }: HeroTextProps) {
  return (
    <motion.div
      style={{ y: textY, opacity }}
      className="relative z-20 max-w-7xl mx-auto px-8 w-full"
    >
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs tracking-[0.35em] uppercase mb-8"
          style={{ color: "var(--crimson)" }}
        >
          {HERO_EYEBROW}
        </motion.p>

        <AnimatedTitle
          text={HERO_TITLE_LINE_1}
          startIndex={0}
          color="var(--off-white)"
          wrapperClassName="mb-1"
        />

        <AnimatedTitle
          text={HERO_TITLE_LINE_2}
          startIndex={HERO_TITLE_LINE_1.length}
          italic
          color="var(--crimson)"
          wrapperClassName="mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-body-serif text-xl leading-relaxed mb-10 max-w-md"
          style={{ color: "var(--gray-light)" }}
        >
          {HERO_DESCRIPTION}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <CheckoutButton
            className="px-8 py-3 text-sm tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: "rgba(139,26,26,0.5)",
              border: "1px solid rgba(192,57,43,0.7)",
              color: "var(--off-white)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 4px 24px rgba(139,26,26,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              {HERO_CTA_PRIMARY}
            </motion.span>
          </CheckoutButton>

          <motion.button
            whileHover={{
              scale: 1.04,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 text-sm tracking-[0.12em] uppercase rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--gray-light)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onClick={onPreviewClick}
          >
            {HERO_CTA_SECONDARY} <span className="text-base">→</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const HeroText = memo(HeroTextComponent);
