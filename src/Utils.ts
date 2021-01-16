import * as path from "path";

export const generateKey = (kind: string, name: string): string => {
  return `${kind}:${name}`;
};

export const split = (p: string, delimiter: string): string[] => {
  return path.normalize(p).split(delimiter);
};
