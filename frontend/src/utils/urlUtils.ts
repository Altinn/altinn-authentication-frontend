export const normalizeUrl = (strings: readonly string[], ...values: readonly string[]): string => {
  let result = strings[0];
  for (let i = 1; i < strings.length; i++) {
    result += encodeURIComponent(values[i - 1]);
    result += strings[i];
  }

  return result;
};
