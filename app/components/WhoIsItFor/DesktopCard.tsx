import { motion } from "framer-motion";
import { audiences } from "./audiences";

export const DesktopCard = ({ item }: { item: (typeof audiences)[0] }) => (
  <motion.div
    key={item.label}
    className="group p-8 text-center rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-[8px]"
  >
    <div className="mb-8">
      <img
        src={item.icon}
        className="w-20 h-20 mx-auto"
        style={{ filter: `drop-shadow(${item.shadow})` }}
      />
    </div>
    <p className="font-display text-base font-semibold mb-2 text-[var(--off-white)]">
      {item.label}
    </p>
    <p className="text-sm text-[var(--gray-mid)]">{item.desc}</p>
  </motion.div>
);
