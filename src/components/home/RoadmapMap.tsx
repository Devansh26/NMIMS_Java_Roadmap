import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { units } from "@/content/units";
import { useProgress } from "@/lib/progress";

const colorMap = {
  brand: { ring: "ring-brand-500/30", bg: "bg-brand-500", text: "text-brand-500", glow: "shadow-[0_0_0_6px_rgba(255,122,26,0.1)]" },
  cyan: { ring: "ring-cyan-400/30", bg: "bg-cyan-400", text: "text-cyan-500", glow: "shadow-[0_0_0_6px_rgba(34,211,238,0.12)]" },
  violet: { ring: "ring-violet-400/30", bg: "bg-violet-400", text: "text-violet-500", glow: "shadow-[0_0_0_6px_rgba(167,139,250,0.12)]" },
  emerald: { ring: "ring-emerald-400/30", bg: "bg-emerald-400", text: "text-emerald-500", glow: "shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" },
  rose: { ring: "ring-rose-400/30", bg: "bg-rose-400", text: "text-rose-500", glow: "shadow-[0_0_0_6px_rgba(251,113,133,0.12)]" },
};

export function RoadmapMap() {
  const completedTopics = useProgress((s) => s.completedTopics);

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-24">
      <div
        className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/50 via-border to-border sm:left-1/2 sm:-translate-x-1/2"
        aria-hidden
      />

      <div className="space-y-6 sm:space-y-10">
        {units.map((unit, i) => {
          const c = colorMap[unit.color];
          const total = unit.topics.length;
          const done = unit.topics.filter((t) => completedTopics[t.id]).length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const isLeft = i % 2 === 0;
          const card = (
            <div
              className={`group relative rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-300 ${
                unit.locked ? "opacity-70" : "hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${c.text}`}>
                  Unit {unit.number}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-ink-mute">
                  <Clock size={11} /> {unit.duration} hrs
                </span>
              </div>
              <h3 className="mb-1.5 text-lg font-bold text-ink">{unit.title}</h3>
              <p className="mb-4 text-[13.5px] leading-relaxed text-ink-dim">{unit.subtitle}</p>

              {unit.locked ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-mute">
                  <Lock size={13} /> Coming soon — added weekly
                </div>
              ) : (
                <>
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-ink-mute">
                    <span>{total} topics</span>
                    <span>{done}/{total} done</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${c.bg} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${c.text}`}>
                    {pct === 100 ? "Review unit" : done > 0 ? "Continue" : "Start unit"}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </>
              )}
            </div>
          );

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative flex items-start gap-4 sm:gap-0 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div
                className={`absolute left-6 top-1 z-10 -translate-x-1/2 sm:left-1/2 ${
                  pct === 100 ? c.glow : ""
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-canvas text-sm font-bold text-white ring-4 ${c.ring} ${
                    unit.locked ? "bg-ink-mute" : c.bg
                  }`}
                >
                  {pct === 100 ? <CheckCircle2 size={20} /> : unit.locked ? <Lock size={16} /> : unit.number}
                </div>
              </div>

              <div className="w-full pl-16 sm:w-1/2 sm:pl-0 sm:even:pl-0">
                <div className={isLeft ? "sm:pr-10" : "sm:pl-10"}>
                  {unit.locked ? (
                    <div className="cursor-not-allowed">{card}</div>
                  ) : (
                    <Link to={`/unit/${unit.id}`}>{card}</Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
