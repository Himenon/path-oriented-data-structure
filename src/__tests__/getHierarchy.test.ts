import { Node } from "../Node";
import type { HierarchicalData } from "../types";
import { Operator } from "../Operator";
import { genTestName } from "./tools";
import { generateKey as gk } from "../Utils";
import { treeKind } from "./sample";

describe("Hierarchical data management", () => {
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
    const node1 = new Node("node", "b");
    operator.set("./a", node1);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [`${node1.kind}:a`]: {
          name: node1.name,
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a", 2), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node1", "b");
    const node2 = new Node("node2", "c");
    operator.set("./a", node1);
    operator.set("./a", node2);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [gk(node1.kind, "a")]: {
          name: node1.name,
        },
        [gk(node2.kind, "a")]: {
          name: node2.name,
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a/b", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "hello");
    operator.set("./a/b", node1);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [gk(treeKind, "a")]: {
          name: "a",
          children: {
            [gk(node1.kind, "b")]: {
              name: node1.name,
            },
          },
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a/b", 2), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node1", "hello");
    const node2 = new Node("node2", "hello");
    operator.set("./a/b", node1);
    operator.set("./a/b", node2);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [gk(treeKind, "a")]: {
          name: "a",
          children: {
            [gk(node1.kind, "b")]: {
              name: node1.name,
            },
            [gk(node2.kind, "b")]: {
              name: node2.name,
            },
          },
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a/b/c", 1), () => {
    const operator = new Operator(treeKind);
    const node1 = new Node("node", "hello");
    operator.set("./a/b/c", node1);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [gk(treeKind, "a")]: {
          name: "a",
          children: {
            [gk(treeKind, "b")]: {
              name: "b",
              children: {
                [gk(node1.kind, "c")]: {
                  name: node1.name,
                },
              },
            },
          },
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
  test(genTestName("./a/b/c", 3), () => {
    const operator = new Operator(treeKind);
    const node_a1 = new Node("node-A", "hello");
    const node_ab2 = new Node("node-B", "world");
    const node_abc3 = new Node("node-C", "!");
    operator.set("./a", node_a1);
    operator.set("./a/b", node_ab2);
    operator.set("./a/b/c", node_abc3);
    const result: HierarchicalData = {
      name: ".",
      children: {
        [gk(node_a1.kind, "a")]: {
          name: node_a1.name,
        },
        [gk(treeKind, "a")]: {
          name: "a",
          children: {
            [gk(node_ab2.kind, "b")]: {
              name: node_ab2.name,
            },
            [gk(treeKind, "b")]: {
              name: "b",
              children: {
                [gk(node_abc3.kind, "c")]: {
                  name: node_abc3.name,
                },
              },
            },
          },
        },
      },
    };
    expect(operator.getHierarchy()).toStrictEqual(result);
  });
});
