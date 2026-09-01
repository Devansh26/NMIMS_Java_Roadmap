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
