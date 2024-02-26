import {
  writePostHtmls,
  writeHomeHtmls,
  writeCategoriesHtml,
  writeSinglePages,
  writeAssets,
} from './writer';

import { 
  mapLocalRoute, 
  extractContents 
} from './mappers';

import { 
  PATH_ENTRY_DIR, 
  PATH_DIST_DIR, 
  PATH_CONTENT_DIR,
  PATH_ASSET_DIR,
  TYPE_POST,
  TYPE_PAGE,
} from '../constants'

import { checkDirectory, countPerformance, getFilePaths } from './utils'

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

const buildDistribution = async (): Promise<void> => { 
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await extractContents(markdownPaths);

  const postContents: Content[] = parsedFiles
    .filter(content => content.type === TYPE_POST);
  const pageContents: Content[] = parsedFiles
    .filter(content => content.type === TYPE_PAGE);

  await buildHomeHtmls(postContents);
  await buildPostHtmls(postContents);
  await buildCategoriesHtmls(postContents);
  await buildPagesHtmls(pageContents);

  await buildLocalRoutes();
}

export const buildLocalRoutes = async(): Promise<void> => {
  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  ROUTES = mapLocalRoute(distPaths);
}

export const buildAssets = async(): Promise<void> => {
  const assetPaths: string[] = await getFilePaths(PATH_ASSET_DIR);
  await writeAssets(assetPaths);
}

export const buildCSS = async(): Promise<void> => {
  Bun.spawn(["bun", "run", "tailwind"])
}

export const compileAssets = async (): Promise<void> => {
  await countPerformance(buildAssets, 'assets');
}

export const compileDistribution = async (): Promise<void> => {  
  await countPerformance(buildDistribution, 'distribution');
  await buildCSS();
}
