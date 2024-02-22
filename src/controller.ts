import type { Content } from "../types/Content";

import { 
  mapContentPerPage, 
  mapHomeLinks 
} from "./mappers";
import {
  simpleMinifier
} from "./utils";
import type { HomeRoute } from "../types/HomeRoute";
import { PATH_ENTRY_DIR, PATH_DIST_DIR } from "../constants";

export const writePostHtmls = async (contents: Content[]): Promise<void> => {
  const PostPage = await import(`${PATH_ENTRY_DIR}/ui/post.ts`);

  contents.forEach(async (obj: Content) => {
    const html: string = PostPage.default(obj);
    const htmlFilePath: string = `${PATH_DIST_DIR}/post/${obj.slug}/index.html`;

    await Bun.write(htmlFilePath, simpleMinifier(html))
  })
}

export const writeHomeHtmls = async (sortedContents: Content[]): Promise<void> => {
  const HomePage = await import(`${PATH_ENTRY_DIR}/ui/home.ts`);
  const contentPerPage: Content[][] = mapContentPerPage(sortedContents)

  for (let page = 1; page < contentPerPage.length + 1; page += 1) {
    const index: number = page - 1
    const { target, prev, next }: HomeRoute = mapHomeLinks(PATH_DIST_DIR, page, contentPerPage.length);

    const html: string = HomePage.default(contentPerPage[index], prev, next);
    await Bun.write(target, simpleMinifier(html))
  }
}
