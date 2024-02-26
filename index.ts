import { watch } from "fs";

import {
  checkDirectory,
  getFilePaths
} from './src/fileExplorer'
import {
  writePostHtmls,
  writeHomeHtmls,
  writeCategoriesHtml,
} from './src/writer';
import { 
  mapLocalRoute, 
  extractContents 
} from './src/mappers';
import { debounce } from "./src/utils";
import { 
  PATH_ENTRY_DIR, 
  PATH_DIST_DIR, 
  PATH_CONTENT_DIR,
  PORT,
} from './constants'

import type { Content } from './types/Content';
import type { LocalRoute } from './types/LocalRoute';

let ROUTES: LocalRoute = {};

const buildPostHtmls = async (contents: Content[]): Promise<void> => {
  await writePostHtmls(contents);
}

const buildHomeHtmls = async (contents: Content[]): Promise<void> => {
  const sortedContents: Content[] = contents.sort((contentA, contentB) => {
    return contentB.date.getTime() - contentA.date.getTime();
  });

  await writeHomeHtmls(sortedContents);
}

const buildCategoriesHtmls = async (contents: Content[]): Promise<void> => {
  await writeCategoriesHtml(contents);
}

const buildDistribution = async (): Promise<void> => {
  const startTime = Bun.nanoseconds();
  
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await extractContents(markdownPaths);

  await buildPostHtmls(parsedFiles);
  await buildHomeHtmls(parsedFiles);
  await buildCategoriesHtmls(parsedFiles);

  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  ROUTES = mapLocalRoute(distPaths);

  const endTime = Bun.nanoseconds()
  const timeTaken = (endTime - startTime) / 1e9;
  console.log(`Rebuilding sites ... Done, ${timeTaken.toFixed(4)}s`)
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

console.log(`Server is listening at port ${PORT}`)
Bun.serve({
  port: PORT,
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