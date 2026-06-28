// app/checkout/components/ErrorMessage.tsx
"use client";

export function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 mb-4 px-4 py-3 rounded-xl bg-red-950/30 border border-red-900/30">
      <div className="w-4 h-4 mt-0.5 rounded-full bg-red-700/40 flex items-center justify-center flex-shrink-0">
        <span className="text-red-400 text-[10px] font-bold">!</span>
      </div>
      <p className="text-xs text-red-400/80 leading-relaxed">{message}</p>
    </div>
  );
}
