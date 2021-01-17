import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { treeKind, StringValueNode, getChildByPaths } from "./sample";
import { genTestName } from "./tools";

describe("Operator.add / get", () => {
  test(genTestName(".", 0), () => {
    const operator = new Operator(treeKind);
    const result: HierarchicalData = {
      name: ".",
      children: {},
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const valueNode = new StringValueNode("hoge", "b");
    operator.set("./a", valueNode);
    const findComponent = getChildByPaths(operator);
    const result = findComponent("./a", "string");
    expect(result).not.toBeUndefined();
    expect(result).toStrictEqual(valueNode);
    expect(result!.getValue()).toBe(valueNode.getValue());
  });
});
