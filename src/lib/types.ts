export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | {
      kind: "code";
      lang: "java" | "cpp" | "text";
      code: string;
      caption?: string;
    }
  | {
      kind: "callout";
      variant: "analogy" | "tip" | "pitfall" | "exam";
      title: string;
      text: string;
    }
  | {
      kind: "compare";
      headers: string[];
      rows: string[][];
    }
  | { kind: "diagram"; name: "uml-relations" | "polymorphism" | "paradigm-shift" }
  | { kind: "heading"; text: string };

export interface QuizQuestion {
  id: string;
  question: string;
  type: "mcq" | "truefalse";
  options: string[];
  correctIndex: number;
  explanation: string;
  code?: CodeSnippet;
}

export interface Topic {
  id: string;
  title: string;
  tagline: string;
  minutes: number;
  blocks: Block[];
  quiz: QuizQuestion[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  duration: number;
  color: "brand" | "cyan" | "violet" | "emerald" | "rose";
  topics: Topic[];
  locked?: boolean;
}

export interface CodeSnippet {
  lang: "java" | "cpp";
  code: string;
}

export interface BankQuestion {
  id: string;
  kind: "theory" | "lab";
  topic: string;
  marks: number;
  difficulty: "Easy" | "Medium";
  exam: string[];
  prompt: string;
  promptCode?: CodeSnippet;
  /** Theory: model-answer key points. Lab: approach / hint bullets. */
  answer?: string[];
  /** Lab only: full worked solution. */
  solutionCode?: CodeSnippet;
  sampleIO?: string;
}

export const QUIZ_TOPICS = [
  "Conditions",
  "Loops",
  "this Keyword",
  "Inheritance",
  "Functions",
  "Scanner",
] as const;

export type QuizTopic = (typeof QUIZ_TOPICS)[number];

export interface QuizBankQuestion extends QuizQuestion {
  topic: QuizTopic;
}

export interface AssignmentPart {
  id: string;
  title: string;
  /** Problem statement; supports `code`, **bold**, *italic* via Prose. */
  statement: string;
  requirements: string[];
  /** Specific screenshots the student must include for this part. */
  screenshots: string[];
  sampleRun?: string;
}

export interface Assignment {
  id: string;
  number: number;
  title: string;
  topic: string;
  marks: number;
  summary: string;
  /** Concepts students will need to look up on their own. */
  concepts: string[];
  parts: AssignmentPart[];
  /** Shown only when set, e.g. "Fri, 24 Oct, 11:59 PM". */
  due?: string;
}

export interface MiniProjectOption {
  id: string;
  title: string;
  tagline: string;
  scenario: string;
  requirements: string[];
  suggestedClasses: { name: string; note: string }[];
  concepts: string[];
  stretchGoals: string[];
}
