// app/checkout/components/CheckoutCard.tsx
"use client";

export function CheckoutCard({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#060606]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_60px_rgba(139,26,26,0.15)]">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-red-700/80 font-medium">
            Secure Checkout
          </p>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1 font-display">
          Because I Loved
        </h1>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/40">Digital Edition</p>
          <span className="text-sm font-semibold text-white bg-red-950/60 border border-red-900/40 px-3 py-1 rounded-full">
            $9.99
          </span>
        </div>

        <div className="flex items-center gap-2 mb-8 p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="w-7 h-7 rounded-full bg-red-900/40 flex items-center justify-center text-xs text-white/60">
            @
          </div>
          <p className="text-xs text-white/40 truncate">{email}</p>
        </div>

        <div className="border-t border-white/5 pt-6">{children}</div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <svg
            className="w-3 h-3 text-white/20"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-[10px] text-white/20 tracking-widest uppercase">
            Secured by PayPal
          </p>
        </div>
      </div>
    </main>
  );
}
