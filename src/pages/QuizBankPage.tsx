import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, Target } from "lucide-react";
import { quizBankQuestions } from "@/content/quizBank";
import { QUIZ_TOPICS } from "@/lib/types";
import { Quiz } from "@/components/topic/Quiz";

export function QuizBankPage() {
  const [activeTopic, setActiveTopic] = useState<string>("All");

  const filtered = activeTopic === "All" ? quizBankQuestions : quizBankQuestions.filter((q) => q.topic === activeTopic);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-500">Quiz · Sat, 19 Sept · 10 Marks</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Quiz Bank</h1>
      <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">
        {quizBankQuestions.length} practice MCQs across the topics below. The in-class quiz picks 20 of these
        (0.5 marks each) — practice the whole pool, since the actual set will vary.
      </p>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-cyan-400/25 bg-cyan-400/[0.06] p-3 text-[13px] text-ink-dim">
        <Info size={15} className="mt-0.5 shrink-0 text-cyan-500" />
        <span>
          Scope: <strong className="text-ink">Conditions, Loops, the this keyword, Inheritance, Functions,
          and Scanner.</strong> This deliberately skips M1's territory (encapsulation, abstraction,
          constructors, OOP basics) — only light, unavoidable touches of conditions/loops appear as
          building blocks for the newer topics.
        </span>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-brand-500/25 bg-brand-50/60 p-3 text-[13px] text-ink-dim dark:bg-brand-500/[0.06]">
        <Target size={15} className="mt-0.5 shrink-0 text-brand-500" />
        <span>
          Each question is multiple-choice — click an option for instant feedback and an explanation. Your
          answers are saved on this device, so you can leave and come back without losing progress.
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTopic("All")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
            activeTopic === "All" ? "border-cyan-500 bg-cyan-500 text-white" : "border-border text-ink-dim hover:bg-surface-2"
          }`}
        >
          All ({quizBankQuestions.length})
        </button>
        {QUIZ_TOPICS.map((t) => {
          const count = quizBankQuestions.filter((q) => q.topic === t).length;
          return (
            <button
              key={t}
              onClick={() => setActiveTopic(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeTopic === t ? "border-cyan-500 bg-cyan-500 text-white" : "border-border text-ink-dim hover:bg-surface-2"
              }`}
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.map((q, i) => (
          <Quiz key={q.id} quiz={q} index={i} labelPrefix="Question" />
        ))}
      </div>
    </main>
  );
}
