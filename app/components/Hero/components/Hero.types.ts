import type { MotionValue } from "framer-motion";

/** Scroll-driven transform values shared across Hero sub-components. */
export interface HeroScrollTransforms {
  authorY: MotionValue<string>;
  bookY: MotionValue<string>;
  textY: MotionValue<string>;
  opacity: MotionValue<number>;
}

export interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeroTextProps {
  textY: MotionValue<string>;
  opacity: MotionValue<number>;
  onPreviewClick: () => void;
}

export interface AuthorVisualProps {
  authorY: MotionValue<string>;
  bookY: MotionValue<string>;
}

export interface AnimatedTitleProps {
  text: string;
  startIndex?: number;
  italic?: boolean;
  color: string;
  /** Extra classes for the outer wrapper (e.g. spacing below the line). */
  wrapperClassName?: string;
}