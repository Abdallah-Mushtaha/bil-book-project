import type { Metadata, Viewport } from "next"; // أضفنا Viewport
import "./globals.css";

export const metadata: Metadata = {
  title: "Because I Loved — Zahraa Naserelddine",
  description: "A debut novel about love, loss, and the courage to feel again.",
};

// هذا هو الجزء الأهم لحل مشاكل الأندرويد
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
    <html lang="en">
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
