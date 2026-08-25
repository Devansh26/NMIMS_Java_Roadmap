import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy, FileCode2 } from "lucide-react";

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("cpp", cpp);

export function CodeBlock({
  code,
  lang,
  caption,
}: {
  code: string;
  lang: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-[#0d0f14] shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <FileCode2 size={14} />
          <span className="font-mono">{caption ?? (lang === "java" ? "Main.java" : lang === "cpp" ? "main.cpp" : "output")}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white/90 cursor-pointer"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang === "java" || lang === "cpp" ? lang : "java"}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "16px 18px",
          background: "transparent",
          fontSize: "13.5px",
          lineHeight: 1.65,
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
