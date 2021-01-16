import { Node } from "../Node";
import type { ObjectItem } from "../types";
import { Operator } from "../Operator";
import { Kind as TreeKind } from "../Tree";
import { generateKey as gk } from "../Utils";

const genName = (p: string, count: number) => `Path: ${p.padEnd(8)}` + `, Node: ${count}`;

describe("addComponent", () => {
  test(genName(".", 0), () => {
    const operator = new Operator();
    const result: ObjectItem = {
      name: ".",
      children: {},
    };
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a", 1), () => {
    const operator = new Operator();
    const node1 = new Node("node", "b");
    operator.addComponent("./a", node1);
    const result: ObjectItem = {
      name: ".",
      children: {
        [`${node1.kind}:a`]: {
          name: node1.name,
        },
      },
    };
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a", 2), () => {
    const operator = new Operator();
    const node1 = new Node("node1", "b");
    const node2 = new Node("node2", "c");
    operator.addComponent("./a", node1);
    operator.addComponent("./a", node2);
    const result: ObjectItem = {
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
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a/b", 1), () => {
    const operator = new Operator();
    const node1 = new Node("node", "hello");
    operator.addComponent("./a/b", node1);
    const result: ObjectItem = {
      name: ".",
      children: {
        [gk(TreeKind, "a")]: {
          name: "a",
          children: {
            [gk(node1.kind, "b")]: {
              name: node1.name,
            },
          },
        },
      },
    };
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a/b", 2), () => {
    const operator = new Operator();
    const node1 = new Node("node1", "hello");
    const node2 = new Node("node2", "hello");
    operator.addComponent("./a/b", node1);
    operator.addComponent("./a/b", node2);
    const result: ObjectItem = {
      name: ".",
      children: {
        [gk(TreeKind, "a")]: {
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
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a/b/c", 1), () => {
    const operator = new Operator();
    const node1 = new Node("node", "hello");
    operator.addComponent("./a/b/c", node1);
    const result: ObjectItem = {
      name: ".",
      children: {
        [gk(TreeKind, "a")]: {
          name: "a",
          children: {
            [gk(TreeKind, "b")]: {
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
    expect(operator.getObject()).toStrictEqual(result);
  });
  test(genName("./a/b/c", 3), () => {
    const operator = new Operator();
    const node_a1 = new Node("node-A", "hello");
    const node_ab2 = new Node("node-B", "world");
    const node_abc3 = new Node("node-C", "!");
    operator.addComponent("./a", node_a1);
    operator.addComponent("./a/b", node_ab2);
    operator.addComponent("./a/b/c", node_abc3);
    const result: ObjectItem = {
      name: ".",
      children: {
        [gk(node_a1.kind, "a")]: {
          name: node_a1.name,
        },
        [gk(TreeKind, "a")]: {
          name: "a",
          children: {
            [gk(node_ab2.kind, "b")]: {
              name: node_ab2.name,
            },
            [gk(TreeKind, "b")]: {
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
    expect(operator.getObject()).toStrictEqual(result);
  });
});
