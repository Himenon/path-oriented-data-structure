import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { treeKind, StringValueNode, createFindComponent } from "./sample";
import { genName } from "./tools";

describe("Operator.add / get", () => {
  test(genName(".", 0), () => {
    const operator = new Operator(treeKind);
    const result: HierarchicalData = {
      name: ".",
      children: {},
    };
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const valueNode = new StringValueNode("hoge", "b");
    operator.addComponent("./a", valueNode);
    const findComponent = createFindComponent(operator);
    const result = findComponent("string", "./a");
    expect(result).not.toBeUndefined();
    expect(result).toStrictEqual(valueNode);
    expect(result!.getValue()).toBe(valueNode.getValue());
  });
});
