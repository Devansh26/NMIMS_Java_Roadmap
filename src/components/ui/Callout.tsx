import { Lightbulb, TriangleAlert, GraduationCap, Sparkles } from "lucide-react";
import { Prose } from "./Prose";

const variants = {
  analogy: {
    icon: Sparkles,
    label: "Analogy",
    classes: "border-violet-400/30 bg-violet-400/[0.06]",
    iconClasses: "text-violet-400",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    classes: "border-cyan-400/30 bg-cyan-400/[0.06]",
    iconClasses: "text-cyan-400",
  },
  pitfall: {
    icon: TriangleAlert,
    label: "Common Pitfall",
    classes: "border-rose-400/30 bg-rose-400/[0.06]",
    iconClasses: "text-rose-400",
  },
  exam: {
    icon: GraduationCap,
    label: "Exam Focus",
    classes: "border-brand-500/30 bg-brand-500/[0.07]",
    iconClasses: "text-brand-500",
  },
};

export function Callout({
  variant,
  title,
  text,
}: {
  variant: keyof typeof variants;
  title: string;
  text: string;
}) {
  const v = variants[variant];
  const Icon = v.icon;
  return (
    <div className={`my-5 rounded-xl border ${v.classes} p-4 sm:p-5`}>
      <div className={`mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${v.iconClasses}`}>
        <Icon size={15} />
        {v.label}
      </div>
      <p className="mb-1 font-semibold text-ink">{title}</p>
      <p className="text-[15px] leading-relaxed text-ink-dim">
        <Prose text={text} />
      </p>
    </div>
  );
}
