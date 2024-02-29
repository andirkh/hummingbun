import type { Content } from '../types/Content';

import HomeUI from '../ui/HomeUI';
import PageUI from '../ui/PageUI';
import PostUI from '../ui/PostUI';

import { mapCategories, mapContentPerPage, mapHomeLinks } from './mappers';
import { hasFileExtension, simpleMinifier } from './utils';
import type { HomeRoute } from '../types/HomeRoute';
import {
  PATH_DIST_DIR,
  PATH_ASSET_DIR,
  PATH_ASSET_DIST_DIR,
} from '../constants';
import type { CategoriesMap } from '../types/CategoriesMap';

export const writePostHtmls = async (contents: Content[]): Promise<void> => {
  contents.forEach(async (obj: Content) => {
    const html: string = PostUI(obj);
    const htmlFilePath: string = `${PATH_DIST_DIR}/post/${obj.slug}/index.html`;

    await Bun.write(htmlFilePath, simpleMinifier(html));
  });
};

export const writeHomeHtmls = async (
  sortedContents: Content[],
): Promise<void> => {
  const contentPerPage: Content[][] = mapContentPerPage(sortedContents);

  for (let page = 1; page < contentPerPage.length + 1; page += 1) {
    const index: number = page - 1;
    const { target, prev, next }: HomeRoute = mapHomeLinks(
      PATH_DIST_DIR,
      page,
      contentPerPage.length,
    );

    const html: string = HomeUI(contentPerPage[index], prev, next);
    await Bun.write(target, simpleMinifier(html));
  }
};

export const writeCategoriesHtml = async (
  contents: Content[],
): Promise<void> => {
  const categoriesMap: CategoriesMap = mapCategories(contents);

  await writeMainCategoriesPage(categoriesMap);
  await writeEachCategoriesPage(categoriesMap);
};

export const writeMainCategoriesPage = async (
  categoriesMap: CategoriesMap,
): Promise<void> => {
  const path: string = `${PATH_DIST_DIR}/categories/index.html`;

  const categories: string[] = Object.keys(categoriesMap);
  const categoriesLink: string = categories
    .map((category) => {
      return String.raw`
      <a href="/categories/${category}">${category}</a>
      <br />
    `;
    })
    .join('');
  const html: string = PageUI(categoriesLink, 'Categories');

  await Bun.write(path, simpleMinifier(html));
};

export const writeEachCategoriesPage = async (
  categoriesMap: CategoriesMap,
): Promise<void> => {
  const categories: string[] = Object.keys(categoriesMap);
  categories.forEach(async (category) => {
    const categoryData: Content[] = categoriesMap[category];
    const postByCategoryLink: string = categoryData
      .map((post) => {
        return String.raw`
        <a href="/post/${post.slug}">${post.title}</a>
        <br />
        `;
      })
      .join('');
    const path: string = `${PATH_DIST_DIR}/categories/${category}/index.html`;
    const html: string = PageUI(postByCategoryLink, `Category: ${category}`);

    await Bun.write(path, simpleMinifier(html));
  });
};

export const writeSinglePages = async (contents: Content[]): Promise<void> => {
  contents.forEach(async (obj: Content) => {
    const html: string = PageUI(obj.content, obj.title);
    const htmlFilePath: string = `${PATH_DIST_DIR}/${obj.slug}/index.html`;

    await Bun.write(htmlFilePath, simpleMinifier(html));
  });
};

export const writeAssets = async (paths: string[]): Promise<void> => {
  paths.forEach(async (path) => {
    const file = Bun.file(path);
    const filename = path.replace(`${PATH_ASSET_DIR}/`, '');
    if (hasFileExtension(filename)) {
      await Bun.write(`${PATH_ASSET_DIST_DIR}/${filename}`, file);
    }
  });
};
