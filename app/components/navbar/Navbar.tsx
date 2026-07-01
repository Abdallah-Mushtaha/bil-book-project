"use client";
import { useUser } from "@clerk/nextjs";
import { useNavbar } from "./hooks/useNavbar";
import { MobileMenu } from "./sub-components/MobileMenu";
import { DesktopNav } from "./sub-components/DesktopNav";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { scrolled, isOpen, setIsOpen, handleSmoothScroll } = useNavbar();

  return (
    <nav className="fixed top-4 md:top-6 z-50 w-full px-4 flex justify-between md:justify-center items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-12 h-12 bg-black/80 text-white rounded-full"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isSignedIn={isSignedIn}
        user={user}
        handleScroll={handleSmoothScroll}
      />

      <DesktopNav
        scrolled={scrolled}
        isSignedIn={isSignedIn}
        handleScroll={handleSmoothScroll}
      />
    </nav>
  );
}
