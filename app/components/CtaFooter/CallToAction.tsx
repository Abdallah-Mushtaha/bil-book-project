import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const CallToAction = ({
  inView,
  ref,
  onPreviewClick,
}: {
  inView: boolean;
  ref: any;
  onPreviewClick: () => void;
}) => (
  <section
    ref={ref}
    className="py-24 md:py-32 px-4 relative overflow-hidden text-center"
    style={{ background: "var(--black)" }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(139,26,26,0.15) 0%, transparent 65%)",
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 md:mb-12 flex justify-center"
        >
          <Image
            src="/B0oks.png"
            alt="Because I Loved"
            width={300}
            height={450}
            className="w-2/3 md:w-[300px] -rotate-12 hover:rotate-0 transition-transform duration-700 ease-out drop-shadow-[0_20px_40px_rgba(139,26,26,0.3)] md:drop-shadow-[0_40px_80px_rgba(139,26,26,0.5)]"
          />
        </motion.div>

        <p
          className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-6"
          style={{ color: "var(--crimson)" }}
        >
          Available Now
        </p>

        <h2
          className="font-display text-4xl md:text-7xl font-bold mb-6 leading-tight px-2"
          style={{ color: "var(--off-white)" }}
        >
          Build{" "}
          <em className="italic" style={{ color: "var(--crimson)" }}>
            Secure Love
          </em>
        </h2>

        <p
          className="font-body-serif text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto px-6"
          style={{ color: "var(--gray-mid)" }}
        >
          Discover practical insights for building healthier, stronger, and more
          secure relationships.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <Link
            href="/checkout"
            className="w-full max-w-[280px] py-4 text-xs tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300"
            style={{
              background: "var(--crimson)",
              color: "white",
              boxShadow: "0 10px 30px -10px rgba(139,26,26,0.5)",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Your Copy
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            className="w-full max-w-[280px] py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-full border border-white/10 backdrop-blur-md transition-all duration-300"
            style={{ color: "var(--off-white)" }}
            onClick={onPreviewClick}
          >
            Read Preview
          </motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);
