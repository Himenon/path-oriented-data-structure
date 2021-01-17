import { normalize } from "path";

export const generateKey = (kind: string, name: string): string => {
  return `${kind}:${name}`;
};

export const split = (p: string, delimiter: string): string[] => {
  return normalize(p).split(delimiter);
};
