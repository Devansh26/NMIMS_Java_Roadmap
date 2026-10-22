import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardCopy, Download, FileUp, Search, ShieldCheck, Trash2, Upload, Users } from "lucide-react";
import {
  extractGroups,
  isDone,
  markOf,
  parseGrid,
  toCsv,
  toRows,
  toTsv,
  totalOf,
  useProjectMarks,
  type ProjectGroup,
} from "@/lib/projectMarks";

type Filter = "all" | "pending" | "done";

const inputCls =
  "rounded-lg border bg-surface-2 px-2.5 py-1.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";
const btnCls =
  "inline-flex items-center gap-1.5 rounded-lg border bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink transition hover:border-brand-500 hover:text-brand-600";

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function parseMark(raw: string, max: number): number | null {
  if (raw.trim() === "") return null;
  const n = Number(raw);
  if (Number.isNaN(n)) return null;
  return Math.min(max, Math.max(0, n));
}

function fmt(n: number | null) {
  return n === null ? "–" : Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function ImportPanel({ onClose }: { onClose?: () => void }) {
  const setRoster = useProjectMarks((s) => s.setRoster);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = (raw: string) => {
    const groups = extractGroups(parseGrid(raw));
    if (!groups.length) {
      setError('No groups found. The sheet should have headers like "Group 1" with seat code and name underneath.');
      return;
    }
    setRoster(groups);
    setError("");
    setText("");
    onClose?.();
  };

  return (
    <section className="rounded-2xl border bg-surface p-5 shadow-card">
      <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
        <Upload size={18} className="text-brand-500" /> Load the groups
      </h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-ink-dim">
        <li>Open your groups Google Sheet.</li>
        <li>
          Either <strong className="text-ink">File → Download → CSV</strong> and choose the file below, or select all
          (Ctrl+A), copy (Ctrl+C) and paste into the box.
        </li>
      </ol>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Paste the sheet here…"
        className={`${inputCls} mt-3 w-full font-mono text-xs`}
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className={btnCls} disabled={!text.trim()} onClick={() => load(text)}>
          <Users size={14} /> Load pasted groups
        </button>
        <button className={btnCls} onClick={() => fileRef.current?.click()}>
          <FileUp size={14} /> Choose CSV file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.tsv,.txt,text/csv"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) load(await f.text());
            e.target.value = "";
          }}
        />
        {onClose && (
          <button className="text-[13px] font-medium text-ink-mute hover:text-ink" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
      {error && <p className="mt-3 text-sm font-medium text-rose-500">{error}</p>}
    </section>
  );
}

function GroupCard({ group }: { group: ProjectGroup }) {
  const { marks, limits, setMark, setGroupCode, setProject } = useProjectMarks();
  const done = group.members.filter((m) => isDone(markOf(marks, m.seat))).length;
  const complete = done === group.members.length;

  return (
    <article className={`rounded-2xl border bg-surface p-4 shadow-card sm:p-5 ${complete ? "border-emerald-500/40" : ""}`}>
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-lg font-bold text-ink">Group {group.id}</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
            complete ? "bg-emerald-500/15 text-emerald-600" : "bg-brand-500/10 text-brand-600"
          }`}
        >
          {done}/{group.members.length} marked
        </span>
        <select
          value={group.project}
          onChange={(e) => setProject(group.id, e.target.value)}
          className={`${inputCls} ml-auto py-1 text-[13px]`}
          aria-label={`Project chosen by group ${group.id}`}
        >
          <option value="">Project: not set</option>
          <option value="Vehicle Rental">Vehicle Rental</option>
          <option value="Hospital Billing">Hospital Billing</option>
          <option value="Other">Other</option>
        </select>
      </header>

      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px] text-ink-dim">
        <span>
          Same <strong className="text-ink">code &amp; output</strong> mark for the whole group:
        </span>
        <input
          type="number"
          min={0}
          max={limits.code}
          step={0.5}
          placeholder="–"
          className={`${inputCls} w-20`}
          aria-label={`Code and output mark for all of group ${group.id}`}
          onChange={(e) => setGroupCode(group.id, parseMark(e.target.value, limits.code))}
        />
        <span className="text-ink-mute">/ {limits.code}. Applies to everyone present; you can still edit each person below.</span>
      </div>

      <div className="mt-3 hidden grid-cols-[4.5rem_1fr_5.5rem_5.5rem_3.5rem_4.5rem] gap-2 px-1 text-[11px] font-bold uppercase tracking-wide text-ink-mute sm:grid">
        <span>Seat</span>
        <span>Name</span>
        <span>Code (/{limits.code})</span>
        <span>Viva (/{limits.viva})</span>
        <span>Total</span>
        <span>Absent</span>
      </div>

      <ul className="mt-1 divide-y">
        {group.members.map((mem) => {
          const m = markOf(marks, mem.seat);
          const total = totalOf(m);
          return (
            <li key={mem.seat} className="py-2.5">
              <div className="grid grid-cols-2 items-center gap-2 sm:grid-cols-[4.5rem_1fr_5.5rem_5.5rem_3.5rem_4.5rem]">
                <span className="font-mono text-[13px] font-semibold text-brand-600">{mem.seat}</span>
                <span className="text-right text-sm font-medium text-ink sm:text-left">{mem.name || "—"}</span>
                <label className="flex items-center gap-1.5 text-[12px] text-ink-mute sm:block">
                  <span className="sm:hidden">Code</span>
                  <input
                    type="number"
                    min={0}
                    max={limits.code}
                    step={0.5}
                    disabled={m.absent}
                    value={m.code ?? ""}
                    onChange={(e) => setMark(mem.seat, { code: parseMark(e.target.value, limits.code) })}
                    className={`${inputCls} w-full disabled:opacity-40`}
                    aria-label={`${mem.name} code and output`}
                  />
                </label>
                <label className="flex items-center gap-1.5 text-[12px] text-ink-mute sm:block">
                  <span className="sm:hidden">Viva</span>
                  <input
                    type="number"
                    min={0}
                    max={limits.viva}
                    step={0.5}
                    disabled={m.absent}
                    value={m.viva ?? ""}
                    onChange={(e) => setMark(mem.seat, { viva: parseMark(e.target.value, limits.viva) })}
                    className={`${inputCls} w-full disabled:opacity-40`}
                    aria-label={`${mem.name} viva`}
                  />
                </label>
                <span className="text-sm font-bold text-ink">
                  <span className="mr-1.5 text-[12px] font-normal text-ink-mute sm:hidden">Total</span>
                  {fmt(total)}
                </span>
                <label className="flex items-center gap-1.5 text-[12px] text-ink-mute">
                  <input
                    type="checkbox"
                    checked={m.absent}
                    onChange={(e) => setMark(mem.seat, { absent: e.target.checked })}
                    className="h-4 w-4 accent-brand-500"
                  />
                  <span className="sm:hidden">Absent</span>
                </label>
              </div>
              <input
                type="text"
                value={m.remark}
                onChange={(e) => setMark(mem.seat, { remark: e.target.value })}
                placeholder="Remark (optional)"
                className={`${inputCls} mt-1.5 w-full py-1 text-[13px]`}
                aria-label={`${mem.name} remark`}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function ProjectMarksPage() {
  const { groups, marks, limits, setLimits, restore, clearAll } = useProjectMarks();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [showImport, setShowImport] = useState(false);
  const [copied, setCopied] = useState(false);
  const backupRef = useRef<HTMLInputElement>(null);

  // Student names live in this browser only, so keep the page out of search results.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const stats = useMemo(() => {
    const all = groups.flatMap((g) => g.members);
    const markedCount = all.filter((m) => isDone(markOf(marks, m.seat))).length;
    const totals = all.map((m) => markOf(marks, m.seat)).filter(isDone).map((m) => totalOf(m) ?? 0);
    const avg = totals.length ? totals.reduce((a, b) => a + b, 0) / totals.length : null;
    return { students: all.length, marked: markedCount, avg };
  }, [groups, marks]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups.filter((g) => {
      const matchesQuery =
        !q ||
        `group ${g.id}`.includes(q) ||
        g.members.some((m) => m.name.toLowerCase().includes(q) || m.seat.toLowerCase().includes(q));
      if (!matchesQuery) return false;
      const complete = g.members.every((m) => isDone(markOf(marks, m.seat)));
      return filter === "all" || (filter === "done" ? complete : !complete);
    });
  }, [groups, marks, query, filter]);

  const rows = () => toRows(groups, marks, limits);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:pt-14">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink">
        <ArrowLeft size={15} /> Roadmap
      </Link>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-violet-500">Faculty tool · Mini Project</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Project Marks</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-dim">
        Enter each student's marks group by group while you check the code and run the viva. Everything saves as you
        type.
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-3 text-[13px] leading-relaxed text-ink-dim">
        <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-500" />
        <p>
          <strong className="text-ink">Private to this browser.</strong> Names and marks are stored only on this device
          and never uploaded or published. Use the same browser each time, and download a CSV or backup before you clear
          browsing data.
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {groups.length === 0 || showImport ? (
          <ImportPanel onClose={groups.length ? () => setShowImport(false) : undefined} />
        ) : (
          <>
            <section className="rounded-2xl border bg-surface p-4 shadow-card">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-dim">
                <span>
                  <strong className="text-lg text-ink">{stats.marked}</strong> / {stats.students} students marked
                </span>
                <span>
                  Average <strong className="text-ink">{stats.avg === null ? "–" : stats.avg.toFixed(2)}</strong> /{" "}
                  {limits.code + limits.viva}
                </span>
                <span className="flex items-center gap-1.5">
                  Split: code
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={limits.code}
                    onChange={(e) => setLimits({ ...limits, code: Math.max(0, Number(e.target.value) || 0) })}
                    className={`${inputCls} w-16 py-1`}
                    aria-label="Maximum marks for code and output"
                  />
                  viva
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={limits.viva}
                    onChange={(e) => setLimits({ ...limits, viva: Math.max(0, Number(e.target.value) || 0) })}
                    className={`${inputCls} w-16 py-1`}
                    aria-label="Maximum marks for viva"
                  />
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${stats.students ? (stats.marked / stats.students) * 100 : 0}%` }}
                />
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[12rem] flex-1">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, seat code or group"
                  className={`${inputCls} w-full pl-8`}
                />
              </div>
              <div className="flex overflow-hidden rounded-lg border text-[13px] font-semibold">
                {(["all", "pending", "done"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 capitalize transition ${
                      filter === f ? "bg-brand-500 text-white" : "bg-surface text-ink-dim hover:text-ink"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className={btnCls} onClick={() => download("project-marks.csv", "﻿" + toCsv(rows()), "text/csv;charset=utf-8")}>
                <Download size={14} /> Download CSV
              </button>
              <button
                className={btnCls}
                onClick={async () => {
                  await navigator.clipboard.writeText(toTsv(rows()));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <ClipboardCopy size={14} /> {copied ? "Copied. Paste into Sheets" : "Copy for Google Sheets"}
              </button>
              <button
                className={btnCls}
                onClick={() =>
                  download("project-marks-backup.json", JSON.stringify({ groups, marks, limits }, null, 2), "application/json")
                }
              >
                <Download size={14} /> Backup
              </button>
              <button className={btnCls} onClick={() => backupRef.current?.click()}>
                <FileUp size={14} /> Restore backup
              </button>
              <input
                ref={backupRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  try {
                    const data = JSON.parse(await f.text());
                    if (!Array.isArray(data.groups) || typeof data.marks !== "object" || !data.limits) throw new Error();
                    if (window.confirm("Replace everything on this page with the backup?")) restore(data);
                  } catch {
                    window.alert("That file is not a valid marks backup.");
                  }
                }}
              />
              <button className={btnCls} onClick={() => setShowImport(true)}>
                <Upload size={14} /> Re-import groups
              </button>
              <button
                className={`${btnCls} ml-auto hover:border-rose-500 hover:text-rose-500`}
                onClick={() => {
                  if (window.confirm("Delete all groups and marks from this browser? Download a backup first if unsure.")) clearAll();
                }}
              >
                <Trash2 size={14} /> Clear all
              </button>
            </div>

            <div className="space-y-4">
              {visible.map((g) => (
                <GroupCard key={g.id} group={g} />
              ))}
              {visible.length === 0 && <p className="py-10 text-center text-sm text-ink-mute">No groups match.</p>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
