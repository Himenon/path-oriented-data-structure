/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Operator } from "../Operator";
import { genTestName } from "./tools";
import { getChildByPaths, StringValueNode, treeKind } from "./sample";

describe("Update Test", () => {
  test(genTestName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const findComponent = getChildByPaths(operator);
    (() => {
      const valueNode = new StringValueNode("hoge", "test-data-1");
      operator.set("./a", valueNode);
    })();
    (() => {
      const component = findComponent("./a", "string");
      component!.setValue("test-data-2");
    })();

    const component = findComponent("./a", "string");
    expect(component!.getValue()).toBe("test-data-2");
  });
  test(genTestName("./a/b", 1), () => {
    const operator = new Operator(treeKind);
    const findComponent = getChildByPaths(operator);
    (() => {
      const valueNode = new StringValueNode("hoge", "test-data-1");
      operator.set("./a/b", valueNode);
    })();
    (() => {
      const component = findComponent("./a/b", "string");
      component!.setValue("test-data-2");
    })();

    const component = findComponent("./a/b", "string");
    expect(component!.getValue()).toBe("test-data-2");
  });
});
