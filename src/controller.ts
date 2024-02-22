import type { BunFile } from "bun";
import type { Content } from "../types/Content";

import { 
  extractFrontmatter, 
  mapContentPerPage, 
  mapHomeLinks 
} from "./mappers";

export const simpleMinifier = (html: string): string => {
  return html
    .replace(/[\n\r\s\t]+/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><').trim()
}

export const parseMarkdownFiles = async (markdownPaths: string[]): Promise<Content[]> => {
  const parsedFiles: Promise<Content>[] = markdownPaths.map(async (mdpath) => {
    const file: BunFile = Bun.file(mdpath);
    const fileText: string = await file.text()
    return extractFrontmatter(fileText)
  })

  return Promise.all(parsedFiles)
}

export const writePostHtmls = async (contents: Content[], entryDir: string, distDir: string): Promise<void> => {
  const PostPage = await import(`${entryDir}/ui/post.ts`);

  contents.forEach(async (obj: Content) => {
    const html = PostPage.default(obj);
    const htmlFilePath = `${distDir}/post/${obj.slug}.html`;

    await Bun.write(htmlFilePath, simpleMinifier(html))
  })
}

export const writeHomeHtmls = async (sortedContents: Content[], entryDir: string, distDir: string): Promise<void> => {
  const HomePage = await import(`${entryDir}/ui/home.ts`);
  const contentPerPage: Content[][] = mapContentPerPage(sortedContents)

  for (let page = 1; page < contentPerPage.length + 1; page += 1) {
    const index = page - 1
    const { target, prev, next } = mapHomeLinks(distDir, page);

    const html = HomePage.default(contentPerPage[index], prev, next);
    await Bun.write(target, simpleMinifier(html))
  }
}
