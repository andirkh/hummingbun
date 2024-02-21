import type { BunFile } from "bun";
import type { ParsedFile } from "../types/ParsedFile";

import { extractFrontmatter } from "./extractor";

export const parseMarkdownFiles = async (markdownPaths: string[]): Promise<ParsedFile[]> => {
  const parsedFiles: Promise<ParsedFile>[] = markdownPaths.map(async (mdpath) => {
    const file: BunFile = Bun.file(mdpath);
    const fileText: string = await file.text()
    return extractFrontmatter(fileText)
  })

  return Promise.all(parsedFiles)
}

export const writePostHtmls = async (parsedFiles: ParsedFile[], entryDir: string, distDir: string): Promise<void> => {
  const PostUI = await import(`${entryDir}/ui/page.ts`);

  parsedFiles.forEach(async (obj: ParsedFile) => {
    const html = PostUI.default(obj);
    const minifiedHtml = html
      .replace(/[\n\r\s\t]+/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><').trim()
    const htmlFilePath = `${distDir}/post/${obj.slug}.html`;
    await Bun.write(htmlFilePath, minifiedHtml)
  })
}
