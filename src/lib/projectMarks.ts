import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GroupMember {
  seat: string;
  name: string;
}

export interface ProjectGroup {
  id: number;
  members: GroupMember[];
  project: string;
}

export interface StudentMark {
  code: number | null;
  viva: number | null;
  absent: boolean;
  remark: string;
}

export interface MarkLimits {
  code: number;
  viva: number;
}

export const emptyMark: StudentMark = { code: null, viva: null, absent: false, remark: "" };

/** Parses CSV or tab-separated text (as copied from Google Sheets) into a grid of cells. */
export function parseGrid(text: string): string[][] {
  const clean = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const firstLine = clean.split("\n").find((l) => l.trim()) ?? "";
  const delim = firstLine.includes("\t") ? "\t" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (quoted) {
      if (ch === '"' && clean[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delim) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

const GROUP_HEADER = /^group\s*(\d+)$/i;

/**
 * Finds every "Group N" header in the grid. The members sit directly below it:
 * seat code in the header's column, name in the next column, until a blank seat cell.
 */
export function extractGroups(grid: string[][]): ProjectGroup[] {
  const groups = new Map<number, ProjectGroup>();
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const m = GROUP_HEADER.exec(cell.trim());
      if (!m) return;
      const id = Number(m[1]);
      const members: GroupMember[] = [];
      for (let rr = r + 1; rr < grid.length; rr++) {
        const seat = (grid[rr][c] ?? "").trim();
        if (!seat || GROUP_HEADER.test(seat)) break;
        members.push({ seat: seat.toUpperCase(), name: (grid[rr][c + 1] ?? "").trim() });
      }
      if (members.length) groups.set(id, { id, members, project: "" });
    });
  });
  return [...groups.values()].sort((a, b) => a.id - b.id);
}

interface MarksState {
  groups: ProjectGroup[];
  marks: Record<string, StudentMark>;
  limits: MarkLimits;
  setRoster: (groups: ProjectGroup[]) => void;
  setMark: (seat: string, patch: Partial<StudentMark>) => void;
  setGroupCode: (groupId: number, value: number | null) => void;
  setProject: (groupId: number, project: string) => void;
  setLimits: (limits: MarkLimits) => void;
  restore: (data: { groups: ProjectGroup[]; marks: Record<string, StudentMark>; limits: MarkLimits }) => void;
  clearAll: () => void;
}

export const useProjectMarks = create<MarksState>()(
  persist(
    (set, get) => ({
      groups: [],
      marks: {},
      limits: { code: 5, viva: 5 },
      // Marks are keyed by seat code, so importing a corrected roster keeps what was already entered.
      setRoster: (groups) => {
        const prev = new Map(get().groups.map((g) => [g.id, g.project]));
        set({ groups: groups.map((g) => ({ ...g, project: prev.get(g.id) ?? "" })) });
      },
      setMark: (seat, patch) =>
        set((s) => ({ marks: { ...s.marks, [seat]: { ...emptyMark, ...s.marks[seat], ...patch } } })),
      setGroupCode: (groupId, value) =>
        set((s) => {
          const group = s.groups.find((g) => g.id === groupId);
          if (!group) return s;
          const marks = { ...s.marks };
          for (const m of group.members) {
            const cur = { ...emptyMark, ...marks[m.seat] };
            if (!cur.absent) marks[m.seat] = { ...cur, code: value };
          }
          return { marks };
        }),
      setProject: (groupId, project) =>
        set((s) => ({ groups: s.groups.map((g) => (g.id === groupId ? { ...g, project } : g)) })),
      setLimits: (limits) => set({ limits }),
      restore: (data) => set({ groups: data.groups, marks: data.marks, limits: data.limits }),
      clearAll: () => set({ groups: [], marks: {}, limits: { code: 5, viva: 5 } }),
    }),
    { name: "nmims-project-marks" }
  )
);

export function markOf(marks: Record<string, StudentMark>, seat: string): StudentMark {
  return { ...emptyMark, ...marks[seat] };
}

export function totalOf(m: StudentMark): number | null {
  if (m.absent) return 0;
  if (m.code === null && m.viva === null) return null;
  return (m.code ?? 0) + (m.viva ?? 0);
}

export function isDone(m: StudentMark): boolean {
  return m.absent || (m.code !== null && m.viva !== null);
}

export function toRows(
  groups: ProjectGroup[],
  marks: Record<string, StudentMark>,
  limits: MarkLimits
): string[][] {
  const rows: string[][] = [
    [
      "Group",
      "Seat code",
      "Name",
      "Project",
      `Code & output (/${limits.code})`,
      `Viva (/${limits.viva})`,
      `Total (/${limits.code + limits.viva})`,
      "Status",
      "Remarks",
    ],
  ];
  for (const g of groups) {
    for (const mem of g.members) {
      const m = markOf(marks, mem.seat);
      const total = totalOf(m);
      rows.push([
        `Group ${g.id}`,
        mem.seat,
        mem.name,
        g.project,
        m.absent ? "" : m.code === null ? "" : String(m.code),
        m.absent ? "" : m.viva === null ? "" : String(m.viva),
        total === null ? "" : String(total),
        m.absent ? "Absent" : isDone(m) ? "Marked" : "Pending",
        m.remark,
      ]);
    }
  }
  return rows;
}

export function toCsv(rows: string[][]): string {
  const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return rows.map((r) => r.map(esc).join(",")).join("\r\n");
}

export function toTsv(rows: string[][]): string {
  return rows.map((r) => r.map((v) => v.replace(/[\t\n\r]+/g, " ")).join("\t")).join("\n");
}
