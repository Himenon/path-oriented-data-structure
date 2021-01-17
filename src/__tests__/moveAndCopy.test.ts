/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { treeKind, StringValueNode } from "./sample";
import { generateKey as gk } from "../Utils";

describe("copy & move", () => {
  test.skip("copy", () => {
    const operator = new Operator(treeKind);
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
        [gk("string", "b")]: {
          name: "string-name",
        },
      },
    };
    const success = operator.copy("./a", "./b", "string");
    expect(success).toBeTruthy();
    expect(operator.getHierarchy()).toStrictEqual(hierarchicalData);
  });
  test("move", () => {
    const operator = new Operator(treeKind);
    (() => {
      const valueNode = new StringValueNode("string-name", "test-data-1");
      operator.set("./a", valueNode);
    })();

    const hierarchicalData: HierarchicalData = {
      name: ".",
      children: {
        [gk("string", "b")]: {
          name: "string-name",
        },
      },
    };
    const success = operator.move("./a", "./b", "string");
    expect(success).toBeTruthy();
    expect(operator.getHierarchy()).toStrictEqual(hierarchicalData);
  });
});
