import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Because I Loved — Zahraa Naserelddine",
  description: "A debut novel about love, loss, and the courage to feel again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
