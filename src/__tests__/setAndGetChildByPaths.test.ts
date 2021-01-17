/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { treeKind, NumberValueNode, StringValueNode, getChildByPaths } from "./sample";
import { genTestName } from "./tools";
import { generateKey as gk } from "../Utils";

describe("Extended Node management test", () => {
  test(genTestName("./a", 1), () => {
    const operator = new Operator(treeKind);
    const findComponent = getChildByPaths(operator);
    (() => {
      const valueNode = new StringValueNode("string-name", "test-data-1");
      operator.set("./a", valueNode);
    })();

    const hierarchicalData: HierarchicalData = {
      name: ".",
      children: {
        [gk("string", "a")]: {
          name: "string-name",
        },
      },
    };

    expect(operator.getHierarchy()).toStrictEqual(hierarchicalData);
    const result = findComponent("./a", "string");
    expect(result).not.toBeUndefined();
    expect(result!.getHierarchy()).toStrictEqual({ name: "string-name" });
    expect(result!.getValue()).toBe("test-data-1");
  });

  test("Multi kind node add", () => {
    const operator = new Operator(treeKind);
    const findComponent = getChildByPaths(operator);
    (() => {
      operator.set("./a", new StringValueNode("string-name", "test-data-1"));
      operator.set("./a", new NumberValueNode("numbe-name", 1));
    })();
    expect(findComponent("./a", "number")!.getValue()).toBe(1);
    expect(findComponent("./a", "string")!.getValue()).toBe("test-data-1");
  });
});
