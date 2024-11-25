import {
  writePostHtmls,
  writeHomeHtmls,
  writeCategoriesHtml,
  writeSinglePages,
  writeAssets,
} from './writer';

import { mapLocalRoute, extractContents } from './mappers';

import {
  PATH_DIST_DIR,
  PATH_CONTENT_DIR,
  PATH_ASSET_DIR,
  TYPE_POST,
  TYPE_PAGE,
} from '../constants';

import { countPerformance, getFilePaths } from './utils';

import type { Content } from '../types/Content';
import type { LocalRoute } from '../types/LocalRoute';

export let ROUTES: LocalRoute = {};

const buildDistribution = async (): Promise<void> => {
  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await extractContents(markdownPaths);

  const contents = parsedFiles
    .filter((content) => content.draft === false)
    .sort((contentA, contentB) => {
      return contentB.date.getTime() - contentA.date.getTime();
    });

  const postContents: Content[] = contents.filter(
    (content) => content.type === TYPE_POST,
  );
  const pageContents: Content[] = contents.filter(
    (content) => content.type === TYPE_PAGE,
  );

  await writeHomeHtmls(postContents);
  await writePostHtmls(postContents);
  await writeCategoriesHtml(postContents);
  await writeSinglePages(pageContents);
};

export const buildLocalRoutes = async (): Promise<void> => {
  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  ROUTES = mapLocalRoute(distPaths);
};

export const buildAssets = async (): Promise<void> => {
  const assetPaths: string[] = await getFilePaths(PATH_ASSET_DIR);
  await writeAssets(assetPaths);
};

export const buildCss = async (): Promise<void> => {
  Bun.spawn(['bun', 'run', 'tailwind']);
};

export const buildAll = async (): Promise<void> => {
  await countPerformance(buildDistribution, 'distribution');
  await buildCss();
  await countPerformance(buildAssets, 'assets');
  await buildLocalRoutes();
};
