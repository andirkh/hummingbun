// declarations.d.ts
declare module 'markdown-it-texmath' {
  import * as MarkdownIt from 'markdown-it';

  // Declare the types that are relevant to your use case
  const tm: (md: MarkdownIt) => void;

  export = tm;
}