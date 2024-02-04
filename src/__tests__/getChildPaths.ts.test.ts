import { expect, test, describe } from "vitest";
import { Node } from "../Node";
import { Operator } from "../Operator";
import { genTestName } from "./tools";
import { treeKind } from "./sample";

describe("Get Child Paths", () => {
  test(genTestName("", 0), () => {
    const operator = new Operator(treeKind);
    expect(operator.getNodePaths("")).toStrictEqual([]);
    expect(operator.getNodePaths("a")).toStrictEqual([]);
    expect(operator.getNodePaths("b")).toStrictEqual([]);
    expect(operator.getNodePaths("c")).toStrictEqual([]);
  });

  test(genTestName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "b");
    operator.set("./a", node1);
    console.log(operator.getHierarchy());
    expect(operator.getNodePaths("node")).toStrictEqual(["./a"]);
  });
  test(genTestName("./a", 2), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node1", "b");
    const node2 = new Node("node2", "c");
    operator.set("./a", node1);
    operator.set("./a", node2);
    expect(operator.getNodePaths("node1")).toStrictEqual(["./a"]);
    expect(operator.getNodePaths("node2")).toStrictEqual(["./a"]);
  });
  test(genTestName("./a/b", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "hello");
    operator.set("./a/b", node1);
    expect(operator.getNodePaths("node")).toStrictEqual(["./a/b"]);
  });
  test(genTestName("./a/b", 2), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node1", "hello");
    const node2 = new Node("node2", "hello");
    operator.set("./a/b", node1);
    operator.set("./a/b", node2);
    expect(operator.getNodePaths("node1")).toStrictEqual(["./a/b"]);
    expect(operator.getNodePaths("node2")).toStrictEqual(["./a/b"]);
  });
  test(genTestName("./a/b/c", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "hello");
    operator.set("./a/b/c", node1);
    expect(operator.getNodePaths("node")).toStrictEqual(["./a/b/c"]);
  });
  test(genTestName("./a/b/c", 3), () => {
    const operator = new Operator(treeKind);
    const node_a1 = new Node("node-A", "hello");
    const node_ab2 = new Node("node-B", "world");
    const node_abc3 = new Node("node-C", "!");
    operator.set("./a", node_a1);
    operator.set("./a/b", node_ab2);
    operator.set("./a/b/c", node_abc3);
    expect(operator.getNodePaths("node-A")).toStrictEqual(["./a"]);
    expect(operator.getNodePaths("node-B")).toStrictEqual(["./a/b"]);
    expect(operator.getNodePaths("node-C")).toStrictEqual(["./a/b/c"]);
  });

  test(genTestName("multi paths", 3), () => {
    const operator = new Operator(treeKind);
    const node_a1 = new Node("node", "hello");
    const node_ab2 = new Node("node", "world");
    const node_abc3 = new Node("node", "!");
    operator.set("./a", node_a1);
    operator.set("./a/b", node_ab2);
    operator.set("./a/b/c", node_abc3);
    expect(operator.getNodePaths("node")).toStrictEqual(["./a", "./a/b", "./a/b/c"]);
  });
});
