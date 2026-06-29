"use client";

export function CheckoutCard({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md p-8 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_0_60px_rgba(139,26,26,0.1)]">
        {/* حالة الأمان */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-gray-mid font-medium">
            Secure Checkout
          </p>
        </div>

        {/* العنوان باستخدام الخطوط المحددة في CSS */}
        <h1 className="font-display text-5xl font-normal text-off-white mb-6 leading-[0.9]">
          Secure <br />
          <span className="italic text-crimson font-serif">Love</span>
        </h1>

        {/* تفاصيل المنتج */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] text-gray-light tracking-[0.25em] uppercase">
            Digital Edition
          </p>
          <span className="text-xs font-light text-white/60 border border-white/10 px-4 py-1 rounded-full">
            $9.99
          </span>
        </div>

        {/* البريد الإلكتروني */}
        <div className="flex items-center gap-3 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-6 h-6 rounded-full bg-crimson/20 flex items-center justify-center text-[10px] text-crimson">
            @
          </div>
          <p className="text-sm text-gray-light tracking-wide truncate">
            {email}
          </p>
        </div>

        {/* منطقة الـ children */}
        <div className="border-t border-white/5 pt-6">{children}</div>

        {/* تذييل الصفحة */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <p className="text-[9px] text-gray-mid tracking-[0.3em] uppercase font-medium">
            Secured by PayPal
          </p>
        </div>
      </div>
    </main>
  );
}
