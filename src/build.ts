import {
  checkDirectory,
  getFilePaths
} from './fileExplorer'
import {
  writePostHtmls,
  writeHomeHtmls,
  writeCategoriesHtml,
  writeSinglePages,
} from './writer';
import { 
  mapLocalRoute, 
  extractContents 
} from './mappers';

import { 
  PATH_ENTRY_DIR, 
  PATH_DIST_DIR, 
  PATH_CONTENT_DIR,
  TYPE_POST,
  TYPE_PAGE,
} from '../constants'

import type { Content } from '../types/Content';
import type { LocalRoute } from '../types/LocalRoute';

export let ROUTES: LocalRoute = {};

const buildPostHtmls = async (contents: Content[]): Promise<void> => {
  await writePostHtmls(contents);
}

const buildPagesHtmls = async (contents: Content[]): Promise<void> => {
  await writeSinglePages(contents);
}

const buildHomeHtmls = async (contents: Content[]): Promise<void> => {
  const sortedContents: Content[] = contents.sort((contentA, contentB) => {
    return contentB.date.getTime() - contentA.date.getTime();
  }).filter(content => content.type === TYPE_POST);

  await writeHomeHtmls(sortedContents);
}

const buildCategoriesHtmls = async (contents: Content[]): Promise<void> => {
  await writeCategoriesHtml(contents);
}

export const buildLocalRoutes = async(): Promise<void> => {
  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  ROUTES = mapLocalRoute(distPaths);
}

const buildDistribution = async (): Promise<void> => { 
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await extractContents(markdownPaths);

  const postContents: Content[] = parsedFiles
    .filter(content => content.type === TYPE_POST);
  const pageContents: Content[] = parsedFiles
    .filter(content => content.type === TYPE_PAGE);

  await buildPostHtmls(postContents);
  await buildHomeHtmls(postContents);
  await buildCategoriesHtmls(postContents);
  await buildPagesHtmls(pageContents);

  await buildLocalRoutes();
}

export const compileDistribution = async (): Promise<void> => {
  const startTime = Bun.nanoseconds();
  
  await buildDistribution()

  const endTime = Bun.nanoseconds()
  const timeTaken = (endTime - startTime) / 1e9;
  console.log(`Rebuilding sites ... Done, ${timeTaken.toFixed(4)}s`)
}