import { Node } from "../Node";
import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { genTestName } from "./tools";
import { treeKind } from "./sample";

describe("Remove Component using path", () => {
  const emptyResult: HierarchicalData = {
    name: ".",
    children: {},
  };
  test(genTestName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "b");
    operator.set("./a", node1);
    operator.remove("./a", node1.kind);
    expect(operator.getHierarchy()).toStrictEqual(emptyResult);
  });
  test(genTestName("./a", 2), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node1", "b");
    const node2 = new Node("node2", "c");
    operator.set("./a", node1);
    operator.set("./a", node2);
    operator.remove("./a", node1.kind);
    operator.remove("./a", node2.kind);
    expect(operator.getHierarchy()).toStrictEqual(emptyResult);
  });
  test(genTestName("./a/b", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "hello");
    operator.set("./a/b", node1);
    operator.remove("./a/b", node1.kind);
    expect(operator.getHierarchy()).toStrictEqual(emptyResult);
  });
});
