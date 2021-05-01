export const generateKey = (kind: string, name: string): string => {
  return `${kind}:${name}`;
};

export const splitKey = (key: string): string[] => {
  return key.split(":");
};

export const split = (p: string, delimiter: string): string[] => {
  const array = [];
  for (const seg of p.split(delimiter)) {
    switch (seg) {
      case ".":
        break;
      case "..":
        array.pop();
        break;
      default:
        array.push(seg);
        break;
    }
  }
  return array;
};
