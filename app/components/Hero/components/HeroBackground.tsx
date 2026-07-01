import { memo } from "react";
import { HERO_RADIAL_GLOW } from "./Hero.constants";

/** Static decorative background layers. Memoized: has no props, never needs to re-render. */
function HeroBackgroundComponent() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ background: HERO_RADIAL_GLOW }}
    />
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);
