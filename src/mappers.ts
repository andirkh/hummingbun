import type { BunFile } from 'bun';

import { parseMarkdownToHtml } from './converter';
import { perPage, RESERVED_SLUG } from './constants';

import type { Content } from './types/Content';
import type { HomeRoute } from './types/HomeRoute';
import type { LocalRoute } from './types/LocalRoute';
import type { CategoriesMap } from './types/CategoriesMap';
import { convertToSlug, generateRandomString } from './utils';
import { Post } from './enums/Post';
import { Page } from './enums/Page';

export const extractMarkdownContents = async (
  markdownPaths: string[],
): Promise<Content[]> => {
  const mdFileRegex = /\.md$/i;

  const parsedFiles: Promise<Content>[] = markdownPaths
    .filter((filepath) => mdFileRegex.test(filepath))
    .map(async (mdpath) => {
      const file: BunFile = Bun.file(mdpath);
      const fileText: string = await file.text();
      return extractFrontmatter(fileText);
    });

  return Promise.all(parsedFiles);
};

export const extractFrontmatter = (markdown: string): Content => {
  const delimiter: string = '---';
  const parts: string[] = markdown.split(delimiter);

  const markdownString: string = parts.slice(2).concat().join();
  const yamlData: Content = {
    content: parseMarkdownToHtml(markdownString),
    title: '',
    date: new Date('1994-01-31T00:00:00Z'),
    author: '',
    categories: [],
    slug: '',
    image: '',
    draft: false,
    type: Post.text,
  };

  if (parts.length > 2) {
    const yamlString: string = parts[1].trim();

    yamlString.split('\n').forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim());

      if (key === 'categories') {
        const categoriesData = Array.isArray(JSON.parse(value))
          ? JSON.parse(value)
          : [];
        yamlData['categories'] = categoriesData;
      }
      if (key === 'date') {
        yamlData['date'] = new Date(value);
      }

      if (key === 'draft') {
        if (value === 'true') {
          yamlData['draft'] = true;
        } else if (value === 'false') {
          yamlData['draft'] = false;
        }
      }

      if (key === 'type' && (value === Post.text || value === Page.text)) {
        yamlData['type'] = value;
      }

      if (key === 'slug') {
        const slugString: string = convertToSlug(value);

        yamlData['slug'] = RESERVED_SLUG.includes(slugString)
          ? convertToSlug(`${yamlData.title} ${generateRandomString()}`)
          : slugString;
      }

      if (key === 'title' || key === 'author' || key === 'image') {
        yamlData[key] = String(value).replace(/['"`]/g, '');
      }
    });
  }

  return yamlData;
};

export const mapContentPerPage = (sortedContents: Content[]): Content[][] => {
  const contentLength: number = sortedContents.length;
  const contentPerPage: Content[][] = [];

  for (let i = 0; i < contentLength; i += perPage) {
    contentPerPage.push(sortedContents.slice(i, i + perPage));
  }
  return contentPerPage;
};

export const mapHomeLinks = (
  distDir: string,
  page: number,
  maxPage: number,
): HomeRoute => {
  const htmlHomePath: string = `${distDir}/index.html`;
  const htmlPagePath: string = `${distDir}/${Page.text}/${page}/index.html`;
  const nextPage: string = `/${Page.text}/${page + 1}`;
  const prevPage: string = `/${Page.text}/${page - 1}`;

  if (page === 1) {
    return {
      target: htmlHomePath,
      prev: '',
      next: nextPage,
    };
  }

  return {
    target: htmlPagePath,
    prev: page === 2 ? `/` : prevPage,
    next: page === maxPage ? '' : nextPage,
  };
};

export const mapLocalRoute = (paths: string[]): LocalRoute => {
  const routes: LocalRoute[] = paths.map((route: string) => {
    const keyString: string = route.split(`/dist`)[1];
    const key: string =
      keyString === '/index.html'
        ? '/'
        : keyString.replace(/\/index\.html$/, '');
    const value = route;
    return { [key]: value };
  });

  return Object.assign({}, ...routes);
};

export const mapCategories = (contents: Content[]) => {
  let categoriesMap: CategoriesMap = {};

  contents.forEach((post) => {
    post.categories.forEach((category) => {
      const formattedCategory = convertToSlug(category);

      if (categoriesMap[formattedCategory]) {
        categoriesMap[formattedCategory] = [
          ...categoriesMap[formattedCategory],
          post,
        ];
      } else {
        categoriesMap[formattedCategory] = [post];
      }
    });
  });

  return categoriesMap;
};
