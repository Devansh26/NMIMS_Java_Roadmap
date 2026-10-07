import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Code2, GraduationCap, Brain, FolderKanban, ClipboardCheck } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { totalTopicCount } from "@/content/units";
import { useEffect, useMemo } from "react";

const navLinks = [
  { to: "/question-bank", label: "Question Bank", short: "Q. Bank", icon: GraduationCap },
  { to: "/quiz-bank", label: "Quiz Bank", short: "Quiz", icon: Brain },
  { to: "/mini-project", label: "Mini Project", short: "Project", icon: FolderKanban },
  { to: "/assignments", label: "Assignments", short: "Assign.", icon: ClipboardCheck },
];

export function Header() {
  const theme = useProgress((s) => s.theme);
  const toggleTheme = useProgress((s) => s.toggleTheme);
  const completedTopics = useProgress((s) => s.completedTopics);
  const location = useLocation();

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

      <div className="border-t border-border/70 bg-surface-2/50">
        <div className="mx-auto flex max-w-6xl items-center gap-1.5 overflow-x-auto px-3 py-2 sm:gap-2 sm:px-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition sm:gap-1.5 sm:px-3 ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-border bg-surface text-ink-dim hover:border-brand-400/50 hover:text-ink"
                }`}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{link.label}</span>
                <span className="sm:hidden">{link.short}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
