export const debounce = <T extends (...args: any[]) => any>(callback: T, wait: number) => {
  let timeoutId: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const simpleMinifier = (html: string): string => {
  return html
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
