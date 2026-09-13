import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, ListChecks, Boxes, Sparkles, Lightbulb } from "lucide-react";
import { miniProjectOptions } from "@/content/miniProject";

const accents = [
  { text: "text-brand-500", border: "border-brand-500/25", bg: "bg-brand-50/60 dark:bg-brand-500/[0.06]", chip: "bg-brand-500" },
  { text: "text-cyan-500", border: "border-cyan-400/25", bg: "bg-cyan-400/[0.06]", chip: "bg-cyan-500" },
];

export function MiniProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-violet-500">10 Marks · Groups of 3–5</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Mini Project</h1>
      <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">
        Every group picks <strong className="text-ink">one</strong> of the two options below. Both are built
        around the same core ideas — a class hierarchy with real inheritance, encapsulated data, and a small
        Scanner-driven console app — just in a different setting. Neither overlaps with the lab experiments
        you've already seen (Employee, Library, Bank Account), so this is genuinely new design work.
      </p>

      <div className="mt-8 space-y-8">
        {miniProjectOptions.map((opt, i) => {
          const a = accents[i % accents.length];
          return (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border ${a.border} ${a.bg} p-5 shadow-card sm:p-6`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${a.chip} text-[11px] font-bold text-white`}>
                  {i + 1}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wide ${a.text}`}>Option {i + 1}</span>
              </div>
              <h2 className="text-xl font-bold text-ink sm:text-2xl">{opt.title}</h2>
              <p className="mt-1 text-sm text-ink-dim">{opt.tagline}</p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-dim">{opt.scenario}</p>

              <div className="mt-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-ink">
                  <ListChecks size={14} className={a.text} /> Requirements
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-dim">
                  {opt.requirements.map((r, ri) => (
                    <li key={ri}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-ink">
                  <Boxes size={14} className={a.text} /> Suggested Class Structure
                </h3>
                <div className="space-y-2">
                  {opt.suggestedClasses.map((c, ci) => (
                    <div key={ci} className="rounded-lg border border-border bg-surface p-3">
                      <p className="font-mono text-[13px] font-semibold text-ink">{c.name}</p>
                      <p className="mt-0.5 text-[13px] text-ink-dim">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-ink">
                  <Sparkles size={14} className={a.text} /> OOP Concepts This Demonstrates
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opt.concepts.map((c, ci) => (
                    <span key={ci} className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12px] text-ink-dim">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-ink">
                  <Lightbulb size={14} className={a.text} /> Stretch Goals (optional, for extra polish)
                </h3>
                <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-dim">
                  {opt.stretchGoals.map((s, si) => (
                    <li key={si}>{s}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-start gap-2 rounded-lg border border-border bg-surface-2 p-4 text-[13px] text-ink-dim">
        <Users size={15} className="mt-0.5 shrink-0 text-ink-mute" />
        <span>
          Form groups of 3–5. Every member should be able to explain any class in the final code — this is
          graded as a demonstration of understanding, not just a working program.
        </span>
      </div>
    </main>
  );
}
