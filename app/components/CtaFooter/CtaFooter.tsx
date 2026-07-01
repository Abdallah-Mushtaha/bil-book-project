"use client";

import { useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { CallToAction } from "./CallToAction";
import { AppFooter } from "./AppFooter";
import { PreviewModal } from "../Hero/components/PreviewModal";
export default function CtaFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreview, setShowPreview] = useState(false);

  const openPreview = useCallback(() => setShowPreview(true), []);
  const closePreview = useCallback(() => setShowPreview(false), []);

  return (
    <>
      <PreviewModal isOpen={showPreview} onClose={closePreview} />

      <CallToAction inView={inView} ref={ref} onPreviewClick={openPreview} />

      <AppFooter />
    </>
  );
}
