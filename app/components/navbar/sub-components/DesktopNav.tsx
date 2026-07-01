import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { NAV_LINKS } from "../Navbar.types";

interface DesktopNavProps {
  scrolled: boolean;
  isSignedIn: boolean | undefined;
  handleScroll: (e: React.MouseEvent, id: string) => void;
}

export const DesktopNav = ({
  scrolled,
  isSignedIn,
  handleScroll,
}: DesktopNavProps) => {
  return (
    <div
      className={`hidden md:flex items-center gap-8 rounded-full border border-white/10 backdrop-blur-xl px-10 py-5 transition-all duration-300 ${
        scrolled ? "bg-black/90" : "bg-black/80"
      }`}
    >
      <a
        href="#"
        className="font-display text-xl italic text-white whitespace-nowrap"
      >
        Emily Carter
      </a>

      <div className="flex gap-8">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={(e) => handleScroll(e, link.id)}
            className="text-xs uppercase text-zinc-400 hover:text-white transition-colors"
          >
            {link.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {isSignedIn && (
          <Link
            href="/my-purchases"
            className="text-xs text-zinc-400 hover:text-white"
          >
            My Purchases
          </Link>
        )}

        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="rounded-full bg-red-700 px-6 py-2 text-xs text-white hover:bg-red-800 transition-colors">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="rounded-full bg-red-700 px-6 py-2 text-xs text-white hover:bg-red-800 transition-colors"
            >
              Order Book
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </div>
  );
};
