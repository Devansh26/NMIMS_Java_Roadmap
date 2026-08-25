import { Hero } from "@/components/home/Hero";
import { RoadmapMap } from "@/components/home/RoadmapMap";

export function HomePage() {
  return (
    <main>
      <Hero />
      <RoadmapMap />
      <footer className="border-t border-border py-8 text-center text-xs text-ink-mute">
        Built for the OOP classroom at MPSTME, NMIMS · New units added weekly
      </footer>
    </main>
  );
}
