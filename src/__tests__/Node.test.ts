import { expect, test, describe } from "vitest";
import { Node } from "../Node";

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
