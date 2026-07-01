"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CallToAction } from "./CallToAction";
import { AppFooter } from "./AppFooter";

export default function CtaFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <CallToAction inView={inView} ref={ref} />
      <AppFooter />
    </>
  );
}
