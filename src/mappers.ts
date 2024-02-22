import { convertMdToHtml } from "./converter";

import { perPage } from "../constants";
import type { Content } from "../types/Content";
import type { HomeRoute } from "../types/HomeRoute";

export const extractFrontmatter = (markdown: string): Content => {
  const delimiter: string = '---';
  const parts: string[] = markdown.split(delimiter);

  const yamlData: Content = {
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

export const mapContentPerPage = (sortedContents: Content[]): Content[][] => {
  const contentLength: number = sortedContents.length;
  const contentPerPage: Content[][] = [];

  for (let i = 0; i < contentLength; i += perPage) {
    contentPerPage.push(sortedContents.slice(i, i + perPage));
  }
  return contentPerPage
}

export const mapHomeLinks = (distDir: string, page: number): HomeRoute => {
  const htmlHomePath: string = `${distDir}/index.html`;
  const htmlPagePath: string = `${distDir}/page/${page}/index.html`
  const nextPage: string = `/page/${page + 1}`;
  const prevPage: string = `/page/${page - 1}`;

  if (page === 1) {
    return {
      target: htmlHomePath,
      prev: '',
      next: nextPage,
    }
  }

  return {
    target: htmlPagePath,
    prev: page === 2 ? `/` : prevPage,
    next: nextPage,
  }
}