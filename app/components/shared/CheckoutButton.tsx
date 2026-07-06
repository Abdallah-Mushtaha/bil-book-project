"use client";

import { ReactNode } from "react";
import { Show, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

interface CheckoutButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string; // default /checkout
}

export const CheckoutButton = ({
  children,
  className,
  style,
  href = "/checkout",
}: CheckoutButtonProps) => {
  return (
    <>
      <Show when="signed-in">
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl={href}>
          <button className={className} style={style}>
            {children}
          </button>
        </SignInButton>
      </Show>
    </>
  );
};
