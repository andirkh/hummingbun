import { PATH_ENTRY_DIR, PATH_DIST_DIR, PATH_CONTENT_DIR } from './constants'
import { 
  checkDirectory, 
  getFilePaths, 
  parseMarkdownFiles,
  writePostHtmls
} from './src/utilities';

const buildDistribution = async (): Promise<void> => {
  await checkDirectory(PATH_ENTRY_DIR);
  await checkDirectory(PATH_DIST_DIR);

  const markdownPaths = await getFilePaths(PATH_CONTENT_DIR);
  const parsedFiles = await parseMarkdownFiles(markdownPaths);
  writePostHtmls(parsedFiles, PATH_ENTRY_DIR, PATH_DIST_DIR);
}

buildDistribution();