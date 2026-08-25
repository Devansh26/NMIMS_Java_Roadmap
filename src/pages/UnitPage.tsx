import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, Lock } from "lucide-react";
import { getUnit } from "@/content/units";
import { useProgress } from "@/lib/progress";

const colorText = {
  brand: "text-brand-500",
  cyan: "text-cyan-500",
  violet: "text-violet-500",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
};
export function UnitPage() {
  const { unitId } = useParams();
  const unit = unitId ? getUnit(unitId) : undefined;
  const completedTopics = useProgress((s) => s.completedTopics);

  if (!unit) return <Navigate to="/" replace />;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${colorText[unit.color]}`}>
        Unit {unit.number}
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{unit.title}</h1>
      <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">{unit.subtitle}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ink-mute">
        <Clock size={13} /> {unit.duration} lecture hours · {unit.topics.length} topics
      </div>

      {unit.locked ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface py-16 text-center">
          <Lock size={22} className="mb-3 text-ink-mute" />
          <p className="font-semibold text-ink">This unit is being built</p>
          <p className="mt-1 max-w-sm text-sm text-ink-dim">
            Content for {unit.title} is added weekly as the semester progresses. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-3">
          {unit.topics.map((topic, i) => {
            const done = completedTopics[topic.id];
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  to={`/unit/${unit.id}/${topic.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-card-hover"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-ink-mute">
                    {done ? (
                      <CheckCircle2 size={19} className="text-emerald-500" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{topic.title}</p>
                    <p className="truncate text-[13px] text-ink-dim">{topic.tagline}</p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-3 text-[11px] font-medium text-ink-mute sm:flex">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {topic.minutes} min
                    </span>
                    {topic.quiz.length > 0 && (
                      <span className="flex items-center gap-1">
                        <HelpCircle size={11} /> {topic.quiz.length}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
