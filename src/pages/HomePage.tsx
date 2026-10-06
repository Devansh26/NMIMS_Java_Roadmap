import { Brain, FolderKanban, NotebookPen } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { RoadmapMap } from "@/components/home/RoadmapMap";
import { theoryQuestionsM2 } from "@/content/questionBankM2";

export function HomePage() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-3xl space-y-3 px-4 pb-10">
        <AnnouncementBanner
          to="/question-bank?exam=M2"
          icon={NotebookPen}
          eyebrow="M2 · Theory · 10 Marks"
          title="M2 Question Bank is live"
          description={`${theoryQuestionsM2.length} practice questions — Strings, Inheritance, Abstraction, Polymorphism, Casting.`}
          accent="brand"
        />
        <AnnouncementBanner
          to="/quiz-bank"
          icon={Brain}
          eyebrow="Sat, 19 Sept · 10 Marks"
          title="Quiz Bank is live"
          description="60 practice MCQs — Conditions, Loops, this, Inheritance, Functions, Scanner."
          accent="cyan"
          delay={0.08}
        />
        <AnnouncementBanner
          to="/mini-project"
          icon={FolderKanban}
          eyebrow="10 Marks · Groups of 3–5"
          title="Mini Project topics are up"
          description="Two options to choose from — pick one and start designing your classes."
          accent="violet"
          delay={0.16}
        />
      </div>
      <RoadmapMap />
      <footer className="border-t border-border py-8 text-center text-xs text-ink-mute">
        Built for the OOP classroom at MPSTME, NMIMS · New units added weekly
      </footer>
    </main>
  );
}
