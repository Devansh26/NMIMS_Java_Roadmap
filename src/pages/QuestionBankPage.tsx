import { useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, FlaskConical, Hourglass, Info, Target } from "lucide-react";
import { theoryQuestions, labQuestions } from "@/content/questionBank";
import { theoryQuestionsM2 } from "@/content/questionBankM2";
import { QuestionCard } from "@/components/questionbank/QuestionCard";

type Tab = "theory" | "lab";

const EXAMS = ["M1", "M2"] as const;
type Exam = (typeof EXAMS)[number];

const allTheory = [...theoryQuestions, ...theoryQuestionsM2];
const allLab = [...labQuestions];

const examInfo: Record<Exam, { eyebrow: string; intro: string; scope: ReactNode; coverage: ReactNode }> = {
  M1: {
    eyebrow: "M1 · 10 Marks · Completed",
    intro:
      "Questions from the M1 test, kept here for revision. Theory and Lab are graded as separate subjects with separate papers, so they're kept strictly apart here too — Theory has no coding prompts beyond an example, and Lab is pure programming.",
    scope: (
      <>
        <strong className="text-ink">Theory</strong> covered Chapter 1 in full, plus Encapsulation, Abstraction and
        Constructors from Chapter 2, and Conditions. <strong className="text-ink">Lab</strong> covered Scanner,
        conditions, all data types, functions/variables, arrays, and a first taste of classes/objects through short
        case studies.
      </>
    ),
    coverage: (
      <>
        This bank covered the large majority of what was tested in M1 — most paper questions were pulled from here
        directly, some lightly reworded. Practice the <em>pattern</em>, not just the exact text.
      </>
    ),
  },
  M2: {
    eyebrow: "M2 · 10 Marks",
    intro:
      "Practice questions for the M2 test — Theory only for now. Lab is a separate paper, so its questions will be added separately. As always, Theory has no coding prompts beyond an example or a snippet to trace.",
    scope: (
      <>
        <strong className="text-ink">Theory</strong> covers Strings, Inheritance, Abstraction (abstract classes and
        interfaces), Polymorphism, and Casting.
      </>
    ),
    coverage: (
      <>
        Questions follow the paper format — short 2-mark bits and 3-mark descriptive or code-tracing questions. Every
        model answer explains the <em>why</em>, so practice the pattern behind each one rather than memorising wording.
      </>
    ),
  },
};

export function QuestionBankPage() {
  const [params, setParams] = useSearchParams();
  const exam: Exam = params.get("exam") === "M1" ? "M1" : "M2";

  const [tab, setTab] = useState<Tab>("theory");
  const [activeTopic, setActiveTopic] = useState<string>("All");

  const { theory, lab } = useMemo(
    () => ({
      theory: allTheory.filter((q) => q.exam.includes(exam)),
      lab: allLab.filter((q) => q.exam.includes(exam)),
    }),
    [exam]
  );

  const questions = tab === "theory" ? theory : lab;
  const topics = useMemo(() => ["All", ...Array.from(new Set(questions.map((q) => q.topic)))], [questions]);
  const filtered = activeTopic === "All" ? questions : questions.filter((q) => q.topic === activeTopic);
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const info = examInfo[exam];

  const selectExam = (next: Exam) => {
    setParams({ exam: next });
    setActiveTopic("All");
  };

  const tabButton = (value: Tab, label: string, count: number, Icon: typeof BookOpen) => (
    <button
      onClick={() => {
        setTab(value);
        setActiveTopic("All");
      }}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition cursor-pointer ${
        tab === value ? "bg-surface text-ink shadow-card" : "text-ink-mute hover:text-ink"
      }`}
    >
      <Icon size={15} /> {label} ({count > 0 ? count : "soon"})
    </button>
  );

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-500">{info.eyebrow}</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Question Bank</h1>

      <div className="mt-5 inline-flex gap-1 rounded-xl border border-border bg-surface-2 p-1" role="tablist" aria-label="Exam">
        {EXAMS.map((e) => (
          <button
            key={e}
            role="tab"
            aria-selected={exam === e}
            onClick={() => selectExam(e)}
            className={`rounded-lg px-5 py-1.5 text-sm font-bold transition cursor-pointer ${
              exam === e ? "bg-brand-500 text-white shadow-card" : "text-ink-mute hover:text-ink"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-dim">{info.intro}</p>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-brand-500/25 bg-brand-50/60 p-3 text-[13px] text-ink-dim dark:bg-brand-500/[0.06]">
        <Info size={15} className="mt-0.5 shrink-0 text-brand-500" />
        <span>{info.scope}</span>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-cyan-400/25 bg-cyan-400/[0.06] p-3 text-[13px] text-ink-dim">
        <Target size={15} className="mt-0.5 shrink-0 text-cyan-500" />
        <span>{info.coverage}</span>
      </div>

      <div className="mt-8 flex gap-2 rounded-xl border border-border bg-surface-2 p-1">
        {tabButton("theory", "Theory", theory.length, BookOpen)}
        {tabButton("lab", "Lab", lab.length, FlaskConical)}
      </div>

      {questions.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface py-14 text-center">
          <Hourglass size={22} className="mb-3 text-ink-mute" />
          <p className="font-semibold text-ink">
            {tab === "lab" ? "Lab" : "Theory"} questions for {exam} aren't up yet
          </p>
          <p className="mt-1 max-w-sm text-sm text-ink-dim">They'll be added here as soon as they're ready.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
