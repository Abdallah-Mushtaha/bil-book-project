"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { NAV_LINKS } from "../Navbar.types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isSignedIn: boolean | undefined;
  user: any;
  handleScroll: (e: React.MouseEvent, id: string) => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isSignedIn,
  user,
  handleScroll,
}: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-20 left-4 p-6 bg-black/90 border border-white/10 rounded-3xl backdrop-blur-2xl w-[calc(100vw-32px)] shadow-2xl z-50"
        >
          {/* User Section */}
          {isSignedIn && (
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
              <UserButton />
              <span className="text-white text-sm font-medium">
                {user?.firstName}
              </span>
            </div>
          )}

          {/* Links Section */}
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleScroll(e, link.id)}
                className="text-left text-sm font-medium text-zinc-300 hover:text-white transition-all py-3 px-2 rounded-xl hover:bg-white/5"
              >
                {link.name}
              </button>
            ))}

            {/* Auth Actions Section */}
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="w-full rounded-xl bg-red-700 py-3 text-xs font-bold text-white hover:bg-red-800">
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <>
                  <Link
                    href="/my-purchases"
                    className="text-sm text-zinc-300 py-2 hover:text-white"
                    onClick={onClose}
                  >
                    My Purchases
                  </Link>
                  <Link
                    href="/checkout"
                    className="w-full rounded-xl bg-red-700 py-3 text-xs font-bold text-white text-center hover:bg-red-800"
                    onClick={onClose}
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
  );
};
