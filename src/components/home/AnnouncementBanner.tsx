import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

const accentMap = {
  brand: {
    border: "border-brand-500/30",
    gradient: "from-brand-500/10 via-brand-500/5 to-transparent",
    iconBg: "bg-brand-500",
    arrow: "text-brand-500",
  },
  cyan: {
    border: "border-cyan-400/30",
    gradient: "from-cyan-400/10 via-cyan-400/5 to-transparent",
    iconBg: "bg-cyan-500",
    arrow: "text-cyan-500",
  },
  violet: {
    border: "border-violet-400/30",
    gradient: "from-violet-400/10 via-violet-400/5 to-transparent",
    iconBg: "bg-violet-500",
    arrow: "text-violet-500",
  },
};

export function AnnouncementBanner({
  to,
  icon: Icon,
  eyebrow,
  title,
  description,
  accent = "brand",
  delay = 0,
}: {
  to: string;
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  description: string;
  accent?: keyof typeof accentMap;
  delay?: number;
}) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className={`group flex items-center gap-4 rounded-2xl border ${a.border} bg-gradient-to-r ${a.gradient} p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:p-5`}
      >
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.iconBg} text-white`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          {eyebrow && <p className="text-[11px] font-bold uppercase tracking-wide text-ink-mute">{eyebrow}</p>}
          <p className="text-sm font-bold text-ink">{title}</p>
          <p className="text-[13px] text-ink-dim">{description}</p>
        </div>
        <ArrowRight size={17} className={`shrink-0 ${a.arrow} transition-transform group-hover:translate-x-1`} />
      </Link>
    </motion.div>
  );
}
