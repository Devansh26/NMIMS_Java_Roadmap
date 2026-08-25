export function PolymorphismDiagram() {
  const targets = [
    { label: "LifeInsurance", detail: "calculatePremium() → 3000", cx: 130 },
    { label: "CarInsurance", detail: "calculatePremium() → 5000", cx: 340 },
    { label: "Insurance", detail: "calculatePremium() → 1000", cx: 550 },
  ];

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-surface p-5 shadow-card">
      <svg viewBox="0 0 660 220" className="min-w-[560px]" role="img" aria-label="Runtime polymorphism dispatch diagram">
        <rect x={230} y={10} width={200} height={40} rx={9} className="fill-brand-500/10 stroke-brand-500" strokeWidth={1.5} />
        <text x={330} y={35} textAnchor="middle" className="fill-ink font-mono text-[13px] font-semibold">
          Insurance p = ...
        </text>

        {targets.map((t) => (
          <g key={t.label}>
            <line
              x1={330} y1={50} x2={t.cx} y2={110}
              className="stroke-ink-mute"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <rect x={t.cx - 85} y={112} width={170} height={38} rx={8} className="fill-surface-2 stroke-border" strokeWidth={1.5} />
            <text x={t.cx} y={136} textAnchor="middle" className="fill-ink font-mono text-[12px] font-medium">
              {t.label}
            </text>
            <rect x={t.cx - 90} y={166} width={180} height={30} rx={7} className="fill-emerald-400/10 stroke-emerald-500" strokeWidth={1.2} />
            <text x={t.cx} y={185} textAnchor="middle" className="fill-emerald-500 font-mono text-[10.5px]">
              {t.detail}
            </text>
          </g>
        ))}

        <text x={330} y={78} textAnchor="middle" className="fill-ink-mute text-[11px] italic">
          actual object decides, at run time
        </text>
      </svg>
    </div>
  );
}
