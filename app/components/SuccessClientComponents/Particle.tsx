import { motion } from "framer-motion";

export const Particle = () => {
  const angle: number = (Math.random() * 90 + 180) * (Math.PI / 180);
  const velocity: number = 400 + Math.random() * 300;

  const randomDelay: number = Math.random() * 8;
  const randomDuration: number = 8 + Math.random() * 4;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        rotate: 360,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute text-red-500/20 text-lg pointer-events-none"
    >
      {Math.random() > 0.5 ? "🍃" : "🌸"}
    </motion.div>
  );
};
