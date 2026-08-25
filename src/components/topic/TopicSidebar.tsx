import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import type { Unit } from "@/lib/types";
import { useProgress } from "@/lib/progress";

const colorText = {
  brand: "text-brand-500",
  cyan: "text-cyan-500",
  violet: "text-violet-500",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
};
const colorBorder = {
  brand: "border-brand-500 bg-brand-50 dark:bg-brand-500/10",
  cyan: "border-cyan-400 bg-cyan-400/10",
  violet: "border-violet-400 bg-violet-400/10",
  emerald: "border-emerald-400 bg-emerald-400/10",
  rose: "border-rose-400 bg-rose-400/10",
};

export function TopicSidebar({ unit, activeTopicId }: { unit: Unit; activeTopicId: string }) {
  const completedTopics = useProgress((s) => s.completedTopics);

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24">
        <Link
          to={`/unit/${unit.id}`}
          className="mb-4 flex items-center gap-1.5 text-xs font-medium text-ink-mute transition hover:text-ink"
        >
          <ArrowLeft size={13} /> Unit {unit.number} overview
        </Link>
        <p className={`mb-3 px-1 text-[11px] font-bold uppercase tracking-wider ${colorText[unit.color]}`}>
          {unit.title}
        </p>
        <nav className="space-y-1">
          {unit.topics.map((t, i) => {
            const isActive = t.id === activeTopicId;
            const done = completedTopics[t.id];
            return (
              <Link
                key={t.id}
                to={`/unit/${unit.id}/${t.id}`}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[13px] transition ${
                  isActive
                    ? `font-semibold text-ink ${colorBorder[unit.color]}`
                    : "border-transparent text-ink-dim hover:bg-surface-2"
                }`}
              >
                {done ? (
                  <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
                ) : (
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-border text-[9px]">
                    {i + 1}
                  </span>
                )}
                <span className="truncate">{t.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
