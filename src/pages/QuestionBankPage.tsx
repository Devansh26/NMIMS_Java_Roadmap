import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FlaskConical, Info } from "lucide-react";
import { theoryQuestions, labQuestions } from "@/content/questionBank";
import { QuestionCard } from "@/components/questionbank/QuestionCard";

type Tab = "theory" | "lab";

export function QuestionBankPage() {
  const [tab, setTab] = useState<Tab>("theory");
  const [activeTopic, setActiveTopic] = useState<string>("All");

  const questions = tab === "theory" ? theoryQuestions : labQuestions;
  const topics = useMemo(() => ["All", ...Array.from(new Set(questions.map((q) => q.topic)))], [questions]);
  const filtered = activeTopic === "All" ? questions : questions.filter((q) => q.topic === activeTopic);
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-500">M1 · 10 Marks</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Question Bank</h1>
      <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">
        Practice questions for this week's M1 test. Theory and Lab are graded as separate subjects with
        separate papers, so they're kept strictly apart here too — Theory has no coding prompts beyond an
        example, and Lab is pure programming.
      </p>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-brand-500/25 bg-brand-50/60 p-3 text-[13px] text-ink-dim dark:bg-brand-500/[0.06]">
        <Info size={15} className="mt-0.5 shrink-0 text-brand-500" />
        <span>
          <strong className="text-ink">Theory</strong> covers Chapter 1 in full, plus Encapsulation, Abstraction
          and Constructors from Chapter 2, and Conditions. <strong className="text-ink">Lab</strong> covers Scanner,
          conditions, all data types, and plain functions/variables — no classes/objects yet.
        </span>
      </div>

      <div className="mt-8 flex gap-2 rounded-xl border border-border bg-surface-2 p-1">
        <button
          onClick={() => {
            setTab("theory");
            setActiveTopic("All");
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition cursor-pointer ${
            tab === "theory" ? "bg-surface text-ink shadow-card" : "text-ink-mute hover:text-ink"
          }`}
        >
          <BookOpen size={15} /> Theory ({theoryQuestions.length})
        </button>
        <button
          onClick={() => {
            setTab("lab");
            setActiveTopic("All");
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition cursor-pointer ${
            tab === "lab" ? "bg-surface text-ink shadow-card" : "text-ink-mute hover:text-ink"
          }`}
        >
          <FlaskConical size={15} /> Lab ({labQuestions.length})
        </button>
      </div>

      <p className="mt-3 text-xs text-ink-mute">
        {filtered.length} question{filtered.length !== 1 ? "s" : ""} shown · {totalMarks} marks total in this pool
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTopic(t)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              activeTopic === t
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-border text-ink-dim hover:bg-surface-2"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </main>
  );
}
