import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Brain } from "lucide-react";
import confetti from "canvas-confetti";
import type { QuizQuestion } from "@/lib/types";
import { useProgress } from "@/lib/progress";

export function Quiz({ quiz, index }: { quiz: QuizQuestion; index: number }) {
  const answer = useProgress((s) => s.quizAnswers[quiz.id]);
  const answerQuiz = useProgress((s) => s.answerQuiz);
  const resetQuiz = useProgress((s) => s.resetQuiz);

  const answered = answer !== undefined;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    const correct = optionIndex === quiz.correctIndex;
    answerQuiz(quiz.id, optionIndex, correct);
    if (correct) {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#ff7a1a", "#22d3ee", "#34d399", "#a78bfa"],
        scalar: 0.85,
      });
    }
  };

  const lines = quiz.question.split("\n").filter(Boolean);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-brand-500/25 bg-gradient-to-br from-brand-50/70 to-transparent shadow-card dark:from-brand-500/[0.06]">
      <div className="flex items-center gap-2 border-b border-border/70 bg-white/40 px-4 py-2.5 dark:bg-white/[0.02]">
        <Brain size={15} className="text-brand-500" />
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Quick Check {index > 0 ? `#${index + 1}` : ""}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-4 space-y-1">
          {lines.map((l, i) => (
            <p key={i} className={`text-[15px] font-medium text-ink ${i > 0 ? "font-mono text-sm text-ink-dim" : ""}`}>
              {l}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          {quiz.options.map((opt, i) => {
            const isCorrect = i === quiz.correctIndex;
            const isSelected = answer?.selected === i;
            let stateClasses = "border-border hover:border-brand-400/50 hover:bg-brand-50/50 dark:hover:bg-white/[0.03]";
            if (answered) {
              if (isCorrect) stateClasses = "border-emerald-500/50 bg-emerald-400/10";
              else if (isSelected) stateClasses = "border-rose-500/50 bg-rose-400/10";
              else stateClasses = "border-border opacity-50";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition ${stateClasses} ${
                  answered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="text-ink">{opt}</span>
                {answered && isCorrect && <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />}
                {answered && isSelected && !isCorrect && <XCircle size={17} className="shrink-0 text-rose-500" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={`mt-4 flex items-start gap-2.5 rounded-lg p-3.5 text-sm ${
                  answer?.correct
                    ? "bg-emerald-400/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-400/10 text-rose-700 dark:text-rose-300"
                }`}
              >
                <span className="mt-0.5 font-semibold shrink-0">{answer?.correct ? "Correct!" : "Not quite —"}</span>
                <span className="text-ink-dim">{quiz.explanation}</span>
              </div>
              <button
                onClick={() => resetQuiz(quiz.id)}
                className="mt-3 flex items-center gap-1.5 text-xs text-ink-mute transition hover:text-ink cursor-pointer"
              >
                <RotateCcw size={12} /> Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
