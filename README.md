# @himenon/path-oriented-data-structure

Data structure management library that extends Composite Pattern to Path orientation.

## Usage

### Basic Usage

```ts
import { Operator, Node } from "@himenon/path-oriented-data-structure";

const operator = new Operator("tree");

const NODE_KIND_A = "node_a" as const;
const NODE_KIND_B = "node_b" as const;

operator.set("a", new Node(NODE_KIND_A, "node_a1"));
operator.set("a/b", new Node(NODE_KIND_A, "node_a2"));
operator.set("a/b/c", new Node(NODE_KIND_A, "node_A3"));

operator.set("a", new Node(NODE_KIND_B, "node_b1"));
operator.set("a/b", new Node(NODE_KIND_B, "node_b2"));
operator.set("a/b/c", new Node(NODE_KIND_B, "node_b3"));

operator.getHierarchy(); // Results below
```

<details>
<summary>Result: operator.getHierarchy()</summary>
<code>
<pre>
{
  "name": ".",
  "children": {
    "node_a:a": {
      "name": "node_a1"
    },
    "tree:a": {
      "name": "a",
      "children": {
        "node_a:b": {
          "name": "node_a2"
        },
        "tree:b": {
          "name": "b",
          "children": {
            "node_a:c": {
              "name": "node_A3"
            },
            "node_b:c": {
              "name": "node_b3"
            }
          }
        },
        "node_b:b": {
          "name": "node_b2"
        }
      }
    },
    "node_b:a": {
      "name": "node_b1"
    }
  }
}
</pre>
</code>
</details>

### Extended usage of `Node`

```ts
import { Operator, Node } from "@himenon/path-oriented-data-structure";

export type KindOfString = "string";
export type KindOfNumber = "number";
export type Kind = KindOfNumber | KindOfString;

export class StringValueNode extends Node<KindOfString> {
  constructor(name: string, private value: string) {
    super("string", name);
  }
  public getValue(): string {
    return this.value;
  }
  public setValue(value: string): void {
    this.value = value;
  }
}

export class NumberValueNode extends Node<KindOfNumber> {
  constructor(name: string, private value: number) {
    super("number", name);
  }
  public getValue(): number {
    return this.value;
  }
}

export type GetNode<T extends Kind> = T extends KindOfString ? StringValueNode : T extends KindOfNumber ? NumberValueNode : never;

// Type Safe method
export const createGetChildByPaths = (operator: Operator<string>) => <T extends Kind>(path: string, kind: T): GetNode<T> | undefined => {
  return operator.getChildByPaths(path, kind) as GetNode<T> | undefined;
};

const operator = new Operator("tree");

operator.set("a/b", new StringValueNode("stringValue", "hello world"));
operator.set("a/b", new NumberValueNode("numberValue", 123455));

operator.getHierarchy(); // Results below

const getChildByPaths = createGetChildByPaths(operator);

getChildByPaths("a/b", "string"); // ReturnType: StringValueNode | undefined
getChildByPaths("a/b", "number"); // ReturnType: NumberValueNode | undefined
```

<details>
<summary>Result: operator.getHierarchy()</summary>
<code>
<pre>
{
  "name": ".",
  "children": {
    "tree:a": {
      "name": "a",
      "children": {
        "string:b": {
          "name": "stringValue"
        },
        "number:b": {
          "name": "numberValue"
        }
      }
    }
  }
}
</pre>
</code>
</details>

## API

### `Operator`

#### `getChildByPaths(path: string, kind: string): Component | undefined`

#### `set(path: string, component: Component): void`

#### `remove(path: string, kind: string): void`

#### `copy(from: string, to: string, kind: string): boolean`

#### `move(from: string, to: string, kind: string): boolean`

#### `getChildPaths(kind: string): string[]`

## LICENCE

[@himenon/path-oriented-data-structure](https://github.com/Himenon/path-oriented-data-structure)・MIT
