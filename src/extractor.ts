import { convertMdToHtml } from "./converter";

import type { ParsedFile } from "../types/ParsedFile";

export const extractFrontmatter = (markdown: string): ParsedFile => {
  const delimiter: string = '---';
  const parts: string[] = markdown.split(delimiter);

  const yamlData: ParsedFile = {
    content: convertMdToHtml(parts.slice(2).concat().join()),
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
  }

  return yamlData;
}
