import { expect, test, describe } from "vitest";
import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { treeKind, NumberValueNode, StringValueNode } from "./sample";
import { generateKey as gk } from "../Utils";

describe("copy & move", () => {
  test("copy", () => {
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

  test("move failed test", () => {
    const operator = new Operator(treeKind);
    (() => {
      operator.set("./a", new StringValueNode("string-name-1", "test-data-1"));
      operator.set("./b", new StringValueNode("string-name-2", "test-data-2"));
    })();

    const hierarchicalData: HierarchicalData = {
      name: ".",
      children: {
        [gk("string", "a")]: {
          name: "string-name-1",
        },
        [gk("string", "b")]: {
          name: "string-name-2",
        },
      },
    };
    const success = operator.move("./a", "./b", "string");
    expect(success).toBeFalsy();
    expect(operator.getHierarchy()).toStrictEqual(hierarchicalData);
  });

  test("multi type move", () => {
    const operator = new Operator(treeKind);
    (() => {
      operator.set("./a", new StringValueNode("string-type", "test-data-1"));
      operator.set("./b", new NumberValueNode("number-type", 100));
    })();

    const hierarchicalData: HierarchicalData = {
      name: ".",
      children: {
        [gk("string", "b")]: {
          name: "string-type",
        },
        [gk("number", "b")]: {
          name: "number-type",
        },
      },
    };
    const success = operator.move("./a", "./b", "string");
    expect(success).toBeTruthy();
    expect(operator.getHierarchy()).toStrictEqual(hierarchicalData);
  });
});
