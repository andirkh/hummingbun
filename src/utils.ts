import { readdir } from "node:fs/promises";

export const debounce = <T extends (...args: any[]) => any>(callback: T, wait: number) => {
  let timeoutId: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const removeRedundantScript = (htmlResult: string): string => {
  const scriptTags: string[] | null = htmlResult.match(/<script>[\s\S]*?<\/script>/g);

  if (!scriptTags) return htmlResult;

  let result: string = htmlResult.replace(/<script>[\s\S]*?<\/script>/g, '');
  const uniqueScriptTags: string[] = [];

  scriptTags.forEach(tag => {
    if (!uniqueScriptTags.includes(tag)) {
      uniqueScriptTags.push(tag);
    }
  });
  const lastIndex = result.lastIndexOf('</body>');

  result = result.slice(0, lastIndex) + uniqueScriptTags.join('\n') + result.slice(lastIndex)
  return result
};

export const simpleMinifier = (html: string): string => {
  return removeRedundantScript(html)
    .replace(/[\n\r\s\t]+/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><').trim()
}

export const convertToSlug = (text: string): string => {
  const symbolPattern = /[^a-zA-Z0-9\s]/g
  return text.replace(symbolPattern, '')
    .replace(" ", "-")
    .toLowerCase()
}

export const generateRandomString = (): string => Math.random().toString(36).substring(2, 6).toUpperCase();

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

export const countPerformance = async (callback: () => Promise<void>, title: string): Promise<void> => {
  const startTime = Bun.nanoseconds();

  await callback();

  const endTime = Bun.nanoseconds();
  const timeTaken = (endTime - startTime) / 1e9;
  console.log(`Rebuilding ${title} ... Done, ${timeTaken.toFixed(4)}s`)
}

export const hasFileExtension = (url: string): boolean => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  
  return lastPart.includes('.');
}