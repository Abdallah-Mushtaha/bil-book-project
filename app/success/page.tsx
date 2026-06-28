import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

function LoadingSpinner() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #060606 0%, #0f0608 50%, #080808 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Glassmorphism card skeleton */}
        <div className="w-80 p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_60px_rgba(139,26,26,0.1)] animate-pulse">
          {/* Icon skeleton */}
          <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-900/20 mx-auto mb-6" />

          {/* Title skeleton */}
          <div className="h-3 w-32 rounded-full bg-white/5 mx-auto mb-3" />
          <div className="h-6 w-48 rounded-full bg-white/[0.07] mx-auto mb-2" />
          <div className="h-4 w-40 rounded-full bg-white/5 mx-auto mb-8" />

          {/* Button skeleton */}
          <div className="h-11 w-full rounded-full bg-red-950/40 border border-red-900/20" />
        </div>

        {/* Spinner */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-700/60 animate-bounce [animation-delay:0ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-700/60 animate-bounce [animation-delay:150ms]" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-700/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessClient />
    </Suspense>
  );
}
