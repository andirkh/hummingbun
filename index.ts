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

import type { Content } from './types/Content';
import type { LocalRoute } from './types/LocalRoute';
import type { ErrorLike, Server } from 'bun';

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
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await parseMarkdownFiles(markdownPaths);

  await buildPostHtmls(parsedFiles);
  await buildHomeHtmls(parsedFiles);
}

const main = async (): Promise<void> => {
  await buildDistribution();
  const distPaths: string[] = await getFilePaths(PATH_DIST_DIR);
  const availableRoutes: LocalRoute = mapLocalRoute(distPaths);

  Bun.serve({
    port: 11072,
    fetch: function (request: Request): Response {
      const { pathname } = new URL(request.url)
      if (request.method === 'GET' && availableRoutes[pathname]) {
        return new Response(Bun.file(availableRoutes[pathname]))
      }
      return new Response('No Route')
    },
    error: function(): Response {
      return new Response('404')
    },
  })
}

main();