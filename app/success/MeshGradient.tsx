"use client";
import { motion } from "framer-motion";

export const MeshGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* بقعة الضوء الحمراء المتحركة */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-red-600/30 rounded-full blur-[120px]"
      />
      {/* بقعة الضوء الزرقاء/البيضاء */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 bottom-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
      />
    </div>
  );
};
