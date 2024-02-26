import type { Content } from "../types/Content";

import { 
  mapCategories,
  mapContentPerPage, 
  mapHomeLinks 
} from "./mappers";
import {
  simpleMinifier
} from "./utils";
import type { HomeRoute } from "../types/HomeRoute";
import { PATH_ENTRY_DIR, PATH_DIST_DIR } from "../constants";
import type { CategoriesMap } from "../types/CategoriesMap";

export const writePostHtmls = async (contents: Content[]): Promise<void> => {
  const PostPage = await import(`${PATH_ENTRY_DIR}/ui/post.ts`);

  contents.forEach(async (obj: Content) => {
    const html: string = PostPage.default(obj);
    const htmlFilePath: string = `${PATH_DIST_DIR}/post/${obj.slug}/index.html`;

    await Bun.write(htmlFilePath, simpleMinifier(html));
  })
}

export const writeHomeHtmls = async (sortedContents: Content[]): Promise<void> => {
  const HomePage = await import(`${PATH_ENTRY_DIR}/ui/home.ts`);
  const contentPerPage: Content[][] = mapContentPerPage(sortedContents);

  for (let page = 1; page < contentPerPage.length + 1; page += 1) {
    const index: number = page - 1;
    const { target, prev, next }: HomeRoute = mapHomeLinks(PATH_DIST_DIR, page, contentPerPage.length);

    const html: string = HomePage.default(contentPerPage[index], prev, next);
    await Bun.write(target, simpleMinifier(html));
  }
}

export const writeCategoriesHtml = async (contents:  Content[]): Promise<void> => {
  const categoriesMap: CategoriesMap  = mapCategories(contents);

  await writeMainCategoriesPage(categoriesMap);
  await writeEachCategoriesPage(categoriesMap);
}

export const writeMainCategoriesPage = async (categoriesMap: CategoriesMap): Promise<void> => {
  const PagePage = await import(`${PATH_ENTRY_DIR}/ui/page.ts`);
  const path: string = `${PATH_DIST_DIR}/categories/index.html`;
  
  const categories: string[] = Object.keys(categoriesMap);
  const categoriesLink: string = categories.map(category => {
    return String.raw`
      <a href="/categories/${category}">${category}</a>
      <br />
    `
  }).join('');
  const html: string = PagePage.default(categoriesLink, "Categories");

  await Bun.write(path, simpleMinifier(html));
}

export const writeEachCategoriesPage = async (categoriesMap: CategoriesMap): Promise<void> => {
  const PagePage = await import(`${PATH_ENTRY_DIR}/ui/page.ts`);

  const categories: string[] = Object.keys(categoriesMap);
  categories.forEach(async (category) => {
    const categoryData: Content[] = categoriesMap[category];
    const postByCategoryLink: string = categoryData.map(post => {
      return String.raw`
        <a href="/post/${post.slug}">${post.title}</a>
        <br />
        `
    }).join('');
    const path: string = `${PATH_DIST_DIR}/categories/${category}/index.html`;
    const html: string = PagePage.default(postByCategoryLink, category);
  
    await Bun.write(path, simpleMinifier(html));
  })
}
