import { PATH_ENTRY_DIR, PATH_DIST_DIR, PATH_CONTENT_DIR } from './constants'
import {
  checkDirectory,
  getFilePaths
} from './src/fileExplorer'

import {
  parseMarkdownFiles,
  writePostHtmls
} from './src/controller';

import type { Content } from './types/Content';

const buildPostHtmls = async (): Promise<void> => {
  const markdownPaths: string[] = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles: Content[] = await parseMarkdownFiles(markdownPaths);

  await writePostHtmls(parsedFiles, PATH_ENTRY_DIR, PATH_DIST_DIR);
}

const buildDistribution = async (): Promise<void> => {
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  await buildPostHtmls();
}

buildDistribution();