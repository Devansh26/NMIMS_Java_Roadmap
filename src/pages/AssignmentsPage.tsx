import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarClock, Camera, Lightbulb, ListChecks, ShieldAlert, Terminal } from "lucide-react";
import { assignments, submissionRules } from "@/content/assignments";
import { Prose } from "@/components/ui/Prose";

const accents = [
  { text: "text-brand-500", border: "border-brand-500/25", bg: "bg-brand-50/60 dark:bg-brand-500/[0.06]", chip: "bg-brand-500" },
  { text: "text-cyan-500", border: "border-cyan-400/25", bg: "bg-cyan-400/[0.06]", chip: "bg-cyan-500" },
];

export function AssignmentsPage() {
  const totalMarks = assignments.reduce((s, a) => s + a.marks, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
        Lab · {assignments.length} × {assignments[0].marks} = {totalMarks} Marks
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Assignments</h1>
      <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">
        Two take-home assignments worth {assignments[0].marks} marks each ({totalMarks} marks in total). They replace
        Lab Experiments 5 and 6, so you will <strong className="text-ink">not</strong> do these two in the lab session —
        you complete them on your own and submit them on Microsoft Teams.
      </p>

      <section className="mt-8 rounded-2xl border border-rose-400/40 bg-rose-400/[0.07] p-5 shadow-card sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <ShieldAlert size={18} className="text-rose-500" />
          Submission rules — read before you start
        </h2>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-rose-500">
          These are strictly enforced and apply to both assignments
        </p>
        <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-relaxed text-ink-dim">
          {submissionRules.map((rule, i) => (
            <li key={i} className="pl-1">
              <Prose text={rule} />
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 space-y-8">
        {assignments.map((a, i) => {
          const accent = accents[i % accents.length];
          return (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl border ${accent.border} ${accent.bg} p-5 shadow-card sm:p-6`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full ${accent.chip} text-[11px] font-bold text-white`}>
                  {a.number}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wide ${accent.text}`}>Assignment {a.number}</span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink-dim">
                  {a.topic}
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                  {a.marks} marks
                </span>
                {a.due && (
                  <span className="flex items-center gap-1 rounded-full border border-rose-400/40 bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-rose-500">
                    <CalendarClock size={11} /> Due {a.due}
                  </span>
                )}
              </div>

              <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">{a.title}</h2>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink-dim">{a.summary}</p>

              <div className="mt-4">
                <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-ink">
                  <Lightbulb size={14} className={accent.text} /> Concepts you'll need to look up
                </h3>
                <div className="flex flex-wrap gap-2">
                  {a.concepts.map((c) => (
                    <span key={c} className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12px] text-ink-dim">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {a.parts.map((p) => (
                  <div key={p.id} className="rounded-xl border border-border bg-surface p-4 sm:p-5">
                    <h3 className="text-[15px] font-bold text-ink">
                      <span className={accent.text}>Part {p.id}</span> — {p.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-dim">
                      <Prose text={p.statement} />
                    </p>

                    <h4 className="mb-1.5 mt-4 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                      <ListChecks size={13} className={accent.text} /> Requirements
                    </h4>
                    <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-dim">
                      {p.requirements.map((r, ri) => (
                        <li key={ri}>
                          <Prose text={r} />
                        </li>
                      ))}
                    </ul>

                    <h4 className="mb-1.5 mt-4 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                      <Camera size={13} className="text-rose-500" /> Screenshots required
                    </h4>
                    <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-dim">
                      {p.screenshots.map((s, si) => (
                        <li key={si}>
                          <Prose text={s} />
                        </li>
                      ))}
                    </ul>

                    {p.sampleRun && (
                      <>
                        <h4 className="mb-1.5 mt-4 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-ink">
                          <Terminal size={13} className={accent.text} /> Sample run
                          <span className="font-medium normal-case tracking-normal text-ink-mute">
                            (your name, roll number and values will differ)
                          </span>
                        </h4>
                        <pre className="overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-[12.5px] leading-relaxed text-ink-dim">
                          {p.sampleRun}
                        </pre>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </main>
  );
}
