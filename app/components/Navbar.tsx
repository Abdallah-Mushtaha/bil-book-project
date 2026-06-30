"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-6 z-50 w-full px-4 flex justify-between md:justify-center items-center">
      {/* زر القائمة للموبايل */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl text-white shadow-xl z-[60]"
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>

      {/* قائمة الموبايل المحدثة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="md:hidden absolute top-20 left-4 p-6 bg-black/90 border border-white/10 rounded-3xl backdrop-blur-2xl w-[calc(100vw-32px)] shadow-2xl z-50"
          >
            {isSignedIn && (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="scale-110">
                  <UserButton />
                </div>
                <span className="text-white text-sm font-medium">
                  {user?.firstName}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={(e) => handleSmoothScroll(e, link)}
                  className="text-left text-sm font-medium text-zinc-300 hover:text-white transition-all py-3 px-2 rounded-xl hover:bg-white/5"
                >
                  {link}
                </button>
              ))}

              <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <button className="w-full rounded-xl bg-red-700 py-3 text-xs font-bold text-white transition-all hover:bg-red-800">
                      Sign In
                    </button>
                  </SignInButton>
                ) : (
                  <>
                    <Link
                      href="/my-purchases"
                      className="text-sm text-zinc-300 hover:text-white py-2 px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      My Purchases
                    </Link>
                    <Link
                      href="/checkout"
                      className="w-full rounded-xl bg-red-700 py-3 text-xs font-bold text-white text-center transition-all hover:bg-red-800"
                      onClick={() => setIsOpen(false)}
                    >
                      Order Book
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Desktop */}
      <div
        className={`hidden md:flex items-center gap-8 rounded-full border border-white/10 backdrop-blur-xl px-10 py-5 transition-all duration-300 ${scrolled ? "bg-black/90" : "bg-black/80"}`}
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
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="rounded-full bg-red-700 px-6 py-2 text-xs text-white cursor-pointer hover:bg-red-800 transition-colors">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <>
            <Link
              href="/checkout"
              className="rounded-full bg-red-700 px-6 py-2 text-xs text-white cursor-pointer hover:bg-red-800 transition-colors"
            >
              Order Book
            </Link>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  );
}
