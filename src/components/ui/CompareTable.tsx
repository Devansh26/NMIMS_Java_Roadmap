export function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-border shadow-card">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-surface-2">
            {headers.map((h, i) => (
              <th
                key={i}
                className="border-b border-border px-4 py-3 text-left font-semibold text-ink first:rounded-tl-xl last:rounded-tr-xl"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="bg-surface even:bg-surface-2/60">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`border-b border-border px-4 py-3 align-top text-ink-dim ${
                    ci === 0 ? "font-medium text-ink" : ""
                  } ${ri === rows.length - 1 ? "border-b-0" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
