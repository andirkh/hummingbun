import markdownit from 'markdown-it'
import { readdir } from "node:fs/promises";

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

export const extractFrontmatter = (markdown: string): ParsedFile => {
  const delimiter: string = '---';
  const parts: string[] = markdown.split(delimiter);

  const md = markdownit()
  const yamlData: ParsedFile = {
    content: md.render(parts.slice(2).concat().join()),
    title: '',
    date: new Date('1994-01-31T00:00:00Z'),
    author: '',
    categories: [],
    slug: '',
    image: '',
    draft: false,
    type: 'post',
  };

  if (parts.length > 2) {
    const yamlString: string = parts[1].trim();

    yamlString.split('\n').forEach(line => {
      const [key, value] = line.split(':').map(item => item.trim());

      if (key === 'categories') { 
        yamlData['categories'] = JSON.parse(value); 
      }
      if (key === 'date') { 
        yamlData['date'] = new Date(value); 
      }
      if (key === 'draft' && typeof value === 'boolean') { 
        yamlData['draft'] = value; 
      }
  
      if (key === 'type' && (value === 'post' || value === 'pages')) { 
        yamlData['type'] = value; 
      }

      if (key === 'title' || key === 'author' || key === 'slug' || key === 'image') {
        yamlData[key] = value;
      }

    });

    return yamlData;
  } else {
    return yamlData;
  }
}

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

