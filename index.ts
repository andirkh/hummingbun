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

import type { Content } from './types/Content';

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

buildDistribution();