"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const downloadUrl = searchParams.get("downloadUrl");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const justPurchased = sessionStorage.getItem("just_purchased");
    if (!justPurchased) {
      router.replace("/");
      return;
    }
    setChecking(false);

    const timer = setTimeout(
      () => {
        sessionStorage.removeItem("just_purchased");
        router.replace("/");
      },
      3 * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [router]);

  if (checking) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
        }}
      >
        <p className="text-white text-sm">Verifying your purchase...</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
      }}
    >
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">📖</div>
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--crimson)" }}
        >
          Payment Successful
        </p>
        <h1
          className="font-display text-3xl font-bold mb-4"
          style={{ color: "var(--off-white)" }}
        >
          Thank you for your order
        </h1>
        <p
          className="font-body-serif text-lg mb-10"
          style={{ color: "var(--gray-mid)" }}
        >
          Your copy of{" "}
          <em style={{ color: "var(--off-white)" }}>Because I Loved</em> is
          ready.
        </p>
        {downloadUrl && (
          <Link
            href={downloadUrl}
            className="inline-block px-8 py-3 rounded-full text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              background: "rgba(139,26,26,0.5)",
              border: "1px solid rgba(192,57,43,0.7)",
              color: "var(--off-white)",
            }}
          >
            Download Book
          </Link>
        )}

        <p className="text-sm py-5" style={{ color: "var(--gray-mid)" }}>
          Check your email for the download link.
        </p>
      </div>
    </main>
  );
}
