"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["About", "The Book", "Readers", "Author"];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(
      id.toLowerCase().replace(/\s+/g, "-"),
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-8 z-50 w-full px-4 flex justify-end md:justify-center">
      <div className="flex flex-col items-end md:items-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl text-white shadow-xl cursor-pointer"
        >
          {isOpen ? "✕" : "☰"}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="md:hidden mt-2 p-6 bg-black/90 border border-white/10 rounded-2xl backdrop-blur-xl w-[260px] shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <button
                    key={link}
                    onClick={(e) => handleSmoothScroll(e, link)}
                    className="text-left text-sm font-medium text-white hover:text-red-400 transition-colors py-2 border-b border-white/5 cursor-pointer"
                  >
                    {link}
                  </button>
                ))}

                {!isSignedIn && (
                  <SignInButton mode="modal">
                    <button className="w-full rounded-lg bg-red-700 px-4 py-3 text-xs font-bold text-white cursor-pointer">
                      Sign In
                    </button>
                  </SignInButton>
                )}

                {isSignedIn && (
                  <>
                    <Link
                      href="/my-purchases"
                      className="text-sm text-white hover:text-red-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      My Purchases
                    </Link>

                    <Link
                      href="/checkout"
                      className="w-full rounded-lg bg-red-700 px-4 py-3 text-xs font-bold text-white text-center cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Order Book
                    </Link>

                    <div className="flex justify-center">
                      <UserButton />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`hidden md:flex items-center gap-8 rounded-full border border-white/10 backdrop-blur-xl px-10 py-5 transition-all duration-300 ${
            scrolled ? "bg-black/90" : "bg-black/80"
          }`}
        >
          <a
            href="#"
            className="font-display text-xl italic text-white cursor-pointer"
          >
            Zahraa Naserelddine
          </a>

          {links.map((link) => (
            <button
              key={link}
              onClick={(e) => handleSmoothScroll(e, link)}
              className="text-xs uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}

          {isSignedIn && (
            <Link
              href="/my-purchases"
              className="text-xs uppercase text-zinc-400 hover:text-white transition-colors"
            >
              My Purchases
            </Link>
          )}

          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="rounded-full bg-red-700 px-6 py-2 text-xs text-white cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          )}

          {isSignedIn && (
            <>
              <Link
                href="/checkout"
                className="rounded-full bg-red-700 px-6 py-2 text-xs text-white cursor-pointer"
              >
                Order Book
              </Link>

              <UserButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
