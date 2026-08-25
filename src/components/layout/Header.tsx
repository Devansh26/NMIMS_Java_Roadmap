import { Link } from "react-router-dom";
import { Moon, Sun, Code2 } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { totalTopicCount } from "@/content/units";
import { useEffect, useMemo } from "react";

export function Header() {
  const theme = useProgress((s) => s.theme);
  const toggleTheme = useProgress((s) => s.toggleTheme);
  const completedTopics = useProgress((s) => s.completedTopics);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const total = totalTopicCount();
  const done = useMemo(
    () => Object.values(completedTopics).filter(Boolean).length,
    [completedTopics]
  );
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-card">
            <Code2 size={17} strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-bold tracking-tight text-ink">OOP Roadmap</p>
            <p className="text-[10.5px] font-medium text-ink-mute">NMIMS · MPSTME</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums text-ink-mute">
              {done}/{total}
            </span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-dim transition hover:bg-surface-2 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
