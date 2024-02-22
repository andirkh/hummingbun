import { readdir } from "node:fs/promises";

export const checkDirectory = async (path: string): Promise<Boolean> => {
  try {
    await readdir(path);
    return true;
  } catch (err) {
    return false;
  }
}

export const getFilePaths = async (dirPath: string): Promise<string[]> => {
  const files = await readdir(dirPath, { recursive: true });
  return files.map(filename => `${dirPath}/${filename}`);
}
