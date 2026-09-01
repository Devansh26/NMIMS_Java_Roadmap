import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb, CheckCircle2 } from "lucide-react";
import type { BankQuestion } from "@/lib/types";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/topic/CodeBlock";

const difficultyClasses: Record<BankQuestion["difficulty"], string> = {
  Easy: "text-emerald-600 bg-emerald-400/10 dark:text-emerald-400",
  Medium: "text-amber-600 bg-amber-400/10 dark:text-amber-400",
};

export function QuestionCard({ question, index }: { question: BankQuestion; index: number }) {
  const [open, setOpen] = useState(false);
  const isLab = question.kind === "lab";

  return (
    <div className="rounded-xl border border-border bg-surface shadow-card">
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-[11px] font-bold text-ink-mute">
            {index + 1}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-ink-dim">
            {question.topic}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${difficultyClasses[question.difficulty]}`}>
            {question.difficulty}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-ink-mute">
            {question.marks} marks
          </span>
        </div>

        <p className="text-[15px] font-medium leading-relaxed text-ink">
          <Prose text={question.prompt} />
        </p>

        {question.promptCode && (
          <CodeBlock code={question.promptCode.code} lang={question.promptCode.lang} caption="Given" />
        )}

        {question.sampleIO && (
          <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-surface-2 p-3 font-mono text-[12.5px] leading-relaxed text-ink-dim">
            {question.sampleIO}
          </pre>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-brand-500 transition hover:text-brand-600 cursor-pointer"
        >
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          {open ? "Hide" : isLab ? "Show approach & solution" : "Show model answer"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-lg border border-brand-500/20 bg-brand-50/60 p-4 dark:bg-brand-500/[0.05]">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                  {isLab ? <Lightbulb size={13} /> : <CheckCircle2 size={13} />}
                  {isLab ? "Approach" : "Key points"}
                </div>
                {question.answer && (
                  <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-dim">
                    {question.answer.map((point, i) => (
                      <li key={i}>
                        <Prose text={point} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {question.solutionCode && (
                <CodeBlock code={question.solutionCode.code} lang={question.solutionCode.lang} caption="Sample solution" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
