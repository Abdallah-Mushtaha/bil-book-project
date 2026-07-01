import { Order } from "./MyPurchasesPage.constants";

export const OrderItem = ({ order }: { order: Order }) => (
  <div className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] transition-all duration-300 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
    <div className="flex flex-col gap-1">
      <p className="text-lg font-medium text-white group-hover:text-red-400 transition-colors">
        Because I Loved
      </p>
      <p className="text-xs text-gray-500 font-mono">
        • {new Date(order.created_at).toLocaleDateString("en-US")}
      </p>
    </div>
    {order.status === "completed" ? (
      <a
        href={`/api/download?orderId=${order.paypal_order_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-600/10 border border-red-500/50 text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
      >
        Download
      </a>
    ) : (
      <div className="w-24 h-9 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
    )}
  </div>
);
