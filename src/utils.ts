export const debounce = <T extends (...args: any[]) => any>(callback: T, wait: number) => {
  let timeoutId: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};