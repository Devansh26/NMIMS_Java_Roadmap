import { Hero } from "@/components/home/Hero";
import { M1Banner } from "@/components/home/M1Banner";
import { RoadmapMap } from "@/components/home/RoadmapMap";

export function HomePage() {
  return (
    <main>
      <Hero />
      <M1Banner />
      <RoadmapMap />
      <footer className="border-t border-border py-8 text-center text-xs text-ink-mute">
        Built for the OOP classroom at MPSTME, NMIMS · New units added weekly
      </footer>
    </main>
  );
}
