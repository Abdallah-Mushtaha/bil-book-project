"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { HomeButton } from "../components/SuccessClientComponents/HomeButton";
import { Particle } from "../components/SuccessClientComponents/Particle";
import Link from "next/link";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [checking, setChecking] = useState<boolean>(true);

  const particles = useMemo(() => [...Array(30)], []);

  useEffect(() => {
    const justPurchased = sessionStorage.getItem("just_purchased");
    if (!justPurchased) {
      router.replace("/");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) return null;

  return (
    <main
      className="min-h-screen flex items-center p-8 md:p-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
      }}
    >
      <HomeButton onClick={() => router.push("/")} />

      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,26,26,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="absolute bottom-0 right-0 w-1 h-1 z-10">
        {particles.map((_, i) => (
          <div key={i} className="absolute">
            <Particle />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 max-w-xl"
      >
        <h1 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
          Your <br />
          <span
            className="font-black italic"
            style={{ color: "var(--crimson, #b91c1c)" }}
          >
            masterpiece
          </span>{" "}
          is ready.
        </h1>

        <p className="text-gray-400 font-light text-lg mb-12 max-w-md leading-relaxed">
          The download link has been secured. You can now access your content
          immediately.
        </p>

        {orderId && (
          <Link
            href={`/api/download?orderId=${orderId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.a
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(139,26,26,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 font-medium uppercase tracking-[0.2em] rounded-full transition-all duration-300"
              style={{
                background: "rgba(139,26,26,0.5)",
                border: "1px solid rgba(192,57,43,0.7)",
                color: "white",
                backdropFilter: "blur(16px)",
              }}
            >
              Download Access
            </motion.a>
          </Link>
        )}
      </motion.div>
    </main>
  );
}
