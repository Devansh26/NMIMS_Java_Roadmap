import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedTopics: Record<string, boolean>;
  quizAnswers: Record<string, { selected: number; correct: boolean }>;
  theme: "dark" | "light";
  markTopicComplete: (topicId: string) => void;
  answerQuiz: (quizId: string, selected: number, correct: boolean) => void;
  resetQuiz: (quizId: string) => void;
  toggleTheme: () => void;
  isTopicComplete: (topicId: string) => boolean;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      quizAnswers: {},
      theme: "dark",
      markTopicComplete: (topicId) =>
        set((s) => ({ completedTopics: { ...s.completedTopics, [topicId]: true } })),
      answerQuiz: (quizId, selected, correct) =>
        set((s) => ({ quizAnswers: { ...s.quizAnswers, [quizId]: { selected, correct } } })),
      resetQuiz: (quizId) =>
        set((s) => {
          const next = { ...s.quizAnswers };
          delete next[quizId];
          return { quizAnswers: next };
        }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      isTopicComplete: (topicId) => !!get().completedTopics[topicId],
    }),
    { name: "nmims-oop-progress" }
  )
);
