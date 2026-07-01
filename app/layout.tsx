import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Secure Love — Emily Carter",
  description: "A debut novel about love, loss, and the courage to feel again.",

  icons: {
    icon: "/SiteLogo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="antialiased overflow-x-hidden">{children}</body>
      </html>
    </ClerkProvider>
  );
}
