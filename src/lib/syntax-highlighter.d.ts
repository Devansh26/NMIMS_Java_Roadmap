declare module "react-syntax-highlighter/dist/esm/prism-light" {
  import type { ComponentType } from "react";
  import type { SyntaxHighlighterProps } from "react-syntax-highlighter";

  interface PrismLightComponent extends ComponentType<SyntaxHighlighterProps> {
    registerLanguage: (name: string, lang: unknown) => void;
  }

  const SyntaxHighlighter: PrismLightComponent;
  export default SyntaxHighlighter;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/*" {
  const language: unknown;
  export default language;
}
