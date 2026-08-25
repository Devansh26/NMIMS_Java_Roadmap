import type { Block } from "@/lib/types";
import { Prose } from "@/components/ui/Prose";
import { Callout } from "@/components/ui/Callout";
import { CompareTable } from "@/components/ui/CompareTable";
import { CodeBlock } from "./CodeBlock";
import { UmlRelationsDiagram } from "@/components/diagrams/UmlRelationsDiagram";
import { PolymorphismDiagram } from "@/components/diagrams/PolymorphismDiagram";

export function ContentBlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "heading":
      return (
        <h3 className="mb-3 mt-8 text-lg font-semibold text-ink first:mt-0">
          <Prose text={block.text} />
        </h3>
      );
    case "p":
      return (
        <p className="prose-content my-3 text-[15.5px] leading-relaxed text-ink-dim">
          <Prose text={block.text} />
        </p>
      );
    case "list":
      return block.ordered ? (
        <ol className="prose-content my-3 list-decimal space-y-2 pl-5 text-[15.5px] text-ink-dim">
          {block.items.map((item, i) => (
            <li key={i}>
              <Prose text={item} />
            </li>
          ))}
        </ol>
      ) : (
        <ul className="prose-content my-3 list-disc space-y-2 pl-5 text-[15.5px] text-ink-dim">
          {block.items.map((item, i) => (
            <li key={i}>
              <Prose text={item} />
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={block.code} lang={block.lang} caption={block.caption} />;
    case "callout":
      return <Callout variant={block.variant} title={block.title} text={block.text} />;
    case "compare":
      return <CompareTable headers={block.headers} rows={block.rows} />;
    case "diagram":
      if (block.name === "uml-relations") return <UmlRelationsDiagram />;
      if (block.name === "polymorphism") return <PolymorphismDiagram />;
      return null;
    default:
      return null;
  }
}
