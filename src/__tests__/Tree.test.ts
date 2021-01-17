import { Node } from "../Node";
import { Tree } from "../Tree";
import type { Children } from "../types";

describe("Tree", () => {
  test("getChildByPaths", () => {
    const tree = new Tree("tree", "my");
    expect(tree.getChildByPaths([], "tree")).toBeUndefined();
  });

  test("getChildren", () => {
    const tree = new Tree("tree", "my");
    const node1 = new Node("node", "1");
    tree.set("a", node1);
    const hierarchicalData: Children = {
      "node:a": node1,
    };
    expect(tree.getChildren()).toStrictEqual(hierarchicalData);
  });
});
