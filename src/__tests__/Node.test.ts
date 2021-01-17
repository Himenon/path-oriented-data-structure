import { Node } from "../Node";
// import { Tree } from "../Tree";
// import type { HierarchicalData } from "../types";

describe("Tree", () => {
  test("getChildren", () => {
    const node = new Node("node", "my");
    expect(node.getChildren()).toBeUndefined();
  });
  test("getChildren", () => {
    const node = new Node("node", "my");
    expect(node.hasChildren()).toBe(false);
  });
  test("set", () => {
    const node = new Node("node", "my");
    expect(node.set()).toBeUndefined();
  });
  test("remove", () => {
    const node = new Node("node", "my");
    expect(node.remove()).toBeUndefined();
  });
  test("getChildByPaths", () => {
    const node = new Node("node", "my");
    expect(node.getChildByPaths()).toBeUndefined();
  });
});
