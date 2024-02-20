import markdownit from 'markdown-it'
import { readdir } from "node:fs/promises";
import matter, { type GrayMatterFile } from 'gray-matter';

import type { BunFile } from "bun";
import type { ParsedFile } from "../types/ParsedFile";

export const checkDirectory = async (path: string): Promise<Boolean> => {
  try {
    await readdir(path);
    return true;
  } catch (err) {
    return false;
  }
}

export const getFilePaths = async (dirPath: string): Promise<string[]> => {
  const files = await readdir(dirPath, { recursive: true });
  return files.map(filename => `${dirPath}/${filename}`);
}

export const parseMarkdownFiles = async (markdownPaths: string[]): Promise<ParsedFile[]> => {
  const parsedFiles: Promise<GrayMatterFile<string>>[] = markdownPaths.map(async (mdpath) => {
    const file: BunFile = Bun.file(mdpath);
    const fileText: string = await file.text()
    return matter(fileText)
  })

  return Promise
    .all(parsedFiles)
    .then((gmFiles) => {
      return gmFiles.map(obj => {
        const md = markdownit()
        const result: ParsedFile = {
          content: md.render(obj.content),
          data: {
            title: obj.data.title,
            date: obj.data.date,
            author: obj.data.author,
            categories: obj.data.categories,
            slug: obj.data.slug,
            image: obj.data.image,
            draft: obj.data.draft
          }
        }

        return result;
      })
    });
}

export const writePostHtmls = async (parsedFiles: ParsedFile[], entryDir: string, distDir: string): Promise<void> => {
  const PostUI = await import(`${entryDir}/ui/page.ts`);

  parsedFiles.forEach(async (obj: ParsedFile) => {
    const html = PostUI.default(obj);
    const minifiedHtml = html
      .replace(/[\n\r\s\t]+/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><').trim()
    const htmlFilePath = `${distDir}/post/${obj.data.slug}.html`;
    await Bun.write(htmlFilePath, minifiedHtml)
  })
}

