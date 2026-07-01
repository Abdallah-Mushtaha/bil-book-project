"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "./portal";
import PreviewBook from "../../../preview/page";
import type { PreviewModalProps } from "./Hero.types";

function PreviewModalComponent({ isOpen, onClose }: PreviewModalProps) {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md p-0 sm:p-6"
            style={{ zIndex: 9999999999 }}
          >
            <button
              onClick={onClose}
              className="fixed top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-all text-2xl sm:text-3xl backdrop-blur-md bg-white/10 shadow-lg hover:bg-white/20"
              style={{ zIndex: 999999999999 }}
              aria-label="إغلاق المعاينة"
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full sm:max-w-6xl mx-auto flex items-center justify-center"
              style={{ maxHeight: "100dvh" }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ maxHeight: "100dvh" }}
              >
                <div className="w-full h-full max-h-[100dvh] overflow-y-auto overscroll-contain">
                  <PreviewBook />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export const PreviewModal = memo(PreviewModalComponent);
