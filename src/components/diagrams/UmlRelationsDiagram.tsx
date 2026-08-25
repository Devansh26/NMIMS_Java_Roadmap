function Box({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={34}
        rx={7}
        className="fill-surface-2 stroke-border"
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + 21.5}
        textAnchor="middle"
        className="fill-ink font-mono text-[12px] font-medium"
      >
        {label}
      </text>
    </g>
  );
}

export function UmlRelationsDiagram() {
  const rowH = 78;
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border bg-surface p-4 shadow-card">
      <svg viewBox="0 0 560 340" className="min-w-[520px]" role="img" aria-label="UML relationship diagram">
        <defs>
          <marker id="tri" markerWidth="14" markerHeight="12" refX="12" refY="6" orient="auto">
            <path d="M0,0 L12,6 L0,12 Z" className="fill-surface stroke-ink-dim" strokeWidth="1" />
          </marker>
        </defs>

        {/* Row 1: Association */}
        <Box x={20} y={10} w={140} label="Teacher" />
        <line x1={160} y1={27} x2={400} y2={27} className="stroke-ink-mute" strokeWidth={1.5} />
        <Box x={400} y={10} w={140} label="Student" />
        <text x={280} y={22} textAnchor="middle" className="fill-ink-mute text-[11px]">advises</text>
        <text x={20} y={62} className="fill-ink-dim text-[12px] font-semibold">
          1. Association — plain line, both independent
        </text>

        {/* Row 2: Generalization */}
        <Box x={20} y={10 + rowH} w={140} label="Account" />
        <line
          x1={160} y1={27 + rowH} x2={392} y2={27 + rowH}
          className="stroke-ink-mute" strokeWidth={1.5} markerEnd="url(#tri)"
        />
        <Box x={400} y={10 + rowH} w={140} label="SavingsAccount" />
        <text x={280} y={22 + rowH} textAnchor="middle" className="fill-ink-mute text-[11px]">extends</text>
        <text x={20} y={62 + rowH} className="fill-ink-dim text-[12px] font-semibold">
          2. Generalization — hollow triangle points to parent (is-a)
        </text>

        {/* Row 3: Aggregation */}
        <Box x={20} y={10 + rowH * 2} w={140} label="Department" />
        <line x1={160} y1={27 + rowH * 2} x2={400} y2={27 + rowH * 2} className="stroke-ink-mute" strokeWidth={1.5} />
        <polygon
          points="168,27 178,20 188,27 178,34"
          transform={`translate(0, ${rowH * 2})`}
          className="fill-surface stroke-ink-mute"
          strokeWidth={1.5}
        />
        <Box x={400} y={10 + rowH * 2} w={140} label="Professor" />
        <text x={280} y={22 + rowH * 2} textAnchor="middle" className="fill-ink-mute text-[11px]">has (weak)</text>
        <text x={20} y={62 + rowH * 2} className="fill-ink-dim text-[12px] font-semibold">
          3. Aggregation — hollow diamond, part can outlive whole
        </text>

        {/* Row 4: Composition */}
        <Box x={20} y={10 + rowH * 3} w={140} label="Car" />
        <line x1={160} y1={27 + rowH * 3} x2={400} y2={27 + rowH * 3} className="stroke-ink-mute" strokeWidth={1.5} />
        <polygon
          points="168,27 178,20 188,27 178,34"
          transform={`translate(0, ${rowH * 3})`}
          className="fill-brand-500 stroke-brand-500"
          strokeWidth={1.5}
        />
        <Box x={400} y={10 + rowH * 3} w={140} label="Engine" />
        <text x={280} y={22 + rowH * 3} textAnchor="middle" className="fill-ink-mute text-[11px]">owns (strong)</text>
        <text x={20} y={62 + rowH * 3} className="fill-ink-dim text-[12px] font-semibold">
          4. Composition — filled diamond, part dies with whole
        </text>
      </svg>
    </div>
  );
}
