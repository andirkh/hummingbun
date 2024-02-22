import { watch } from "fs";

import { PATH_ENTRY_DIR, PATH_DIST_DIR, PATH_CONTENT_DIR, perPage } from './constants'
import {
  checkDirectory,
  getFilePaths
} from './src/fileExplorer'

import {
  parseMarkdownFiles,
  writePostHtmls,
  writeHomeHtmls,
} from './src/controller';

import { mapLocalRoute } from './src/mappers';

import { debounce } from "./src/utils";

import type { Content } from './types/Content';
import type { LocalRoute } from './types/LocalRoute';

let ROUTES: LocalRoute = {};

const buildPostHtmls = async (contents: Content[]): Promise<void> => {
  await writePostHtmls(contents, PATH_ENTRY_DIR, PATH_DIST_DIR);
}

const buildHomeHtmls = async (contents: Content[]): Promise<void> => {
  const sortedContents: Content[] = contents.sort((contentA, contentB) => {
    return contentB.date.getTime() - contentA.date.getTime();
  });

  await writeHomeHtmls(sortedContents, PATH_ENTRY_DIR, PATH_DIST_DIR);
}

const buildDistribution = async (): Promise<void> => {
  console.log("rebuilding sites ...")
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await parseMarkdownFiles(markdownPaths);

  await buildPostHtmls(parsedFiles);
  await buildHomeHtmls(parsedFiles);

  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  ROUTES = mapLocalRoute(distPaths);
}

const debouncedBuildDistribution = debounce(buildDistribution, 1000)


await buildDistribution();

watch(
  PATH_ENTRY_DIR,
  { recursive: true },
  (_event, filename): void => {
    if (typeof filename === 'string' && !filename.startsWith('dist/')) {
      debouncedBuildDistribution()
    }
  },
);

Bun.serve({
  port: 11072,
  fetch: function (request: Request): Response {
    const { pathname } = new URL(request.url)
    if (request.method === 'GET' && ROUTES[pathname]) {
      return new Response(Bun.file(ROUTES[pathname]))
    }
    return new Response('No Route')
  },
  error: function (): Response {
    return new Response('404')
  },
})