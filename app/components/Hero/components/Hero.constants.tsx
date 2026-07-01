import type { Variants } from "framer-motion";

export const HERO_TITLE_LINE_1 = "Secure";
export const HERO_TITLE_LINE_2 = "Love";

export const HERO_EYEBROW = "Relationship Guide";

export const HERO_DESCRIPTION =
  "Discover how secure attachment transforms communication, deepens intimacy, and helps create relationships that truly last.";

export const HERO_CTA_PRIMARY = "Get Your Copy";
export const HERO_CTA_SECONDARY = "Preview Book";

export const HERO_BACKGROUND_GRADIENT =
  "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)";

export const HERO_RADIAL_GLOW =
  "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.04) 0%, transparent 50%)";

export const AUTHOR_IMAGE_MASK =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.9) 80%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,1) 60%, transparent 100%)";

export const SCROLL_LINE_GRADIENT =
  "linear-gradient(to bottom, var(--crimson), transparent)";

/** Letter-by-letter reveal animation, indexed by absolute character position. */
export const LETTER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.7, ease: "easeOut" },
  }),
};
