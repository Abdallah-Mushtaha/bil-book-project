import { audiences } from "./audiences";

export const MobileCard = ({ item }: { item: (typeof audiences)[0] }) => (
  <div
    key={item.label}
    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]"
  >
    <img
      src={item.icon}
      className="w-12 h-12"
      style={{ filter: `drop-shadow(${item.shadow})` }}
    />
    <div className="text-left">
      <p className="text-sm font-bold text-[var(--off-white)]">{item.label}</p>
      <p className="text-xs text-[var(--gray-mid)]">{item.desc}</p>
    </div>
  </div>
);
