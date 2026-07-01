"use client";

import { memo, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

/**
 * Renders children outside the current DOM hierarchy (into document.body),
 * avoiding stacking-context issues (e.g. z-index conflicts with transformed
 * ancestors). Safe for SSR: it mounts only after hydration.
 */
function PortalComponent({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

export const Portal = memo(PortalComponent);
