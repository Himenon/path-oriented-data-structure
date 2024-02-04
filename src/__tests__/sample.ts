import { expect, test, describe } from "vitest";
import { Node } from "../Node";
import { Operator } from "../Operator";

export const treeKind = "tree" as const;

export type KindOfString = "string";
export type KindOfNumber = "number";
export type Kind = KindOfNumber | KindOfString;

export class StringValueNode extends Node<KindOfString> {
  constructor(
    name: string,
    private value: string,
  ) {
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
  constructor(
    name: string,
    private value: number,
  ) {
    super("number", name);
  }
  public getValue(): number {
    return this.value;
  }
}

export type GetNode<T extends Kind> = T extends KindOfString ? StringValueNode : T extends KindOfNumber ? NumberValueNode : never;

export const getChildByPaths =
  (operator: Operator<string>) =>
  <T extends Kind>(path: string, kind: T): GetNode<T> | undefined => {
    return operator.getChildByPaths(path, kind) as GetNode<T> | undefined;
  };
