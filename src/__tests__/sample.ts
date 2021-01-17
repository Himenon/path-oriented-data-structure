import { Node } from "../Node";
import { Operator } from "../Operator";

export const treeKind = "tree" as const;

export type KindOfString = "string";
export type KindOfNumber = "number";
export type Kind = KindOfNumber | KindOfString;

export class StringValueNode extends Node<KindOfString> {
  constructor(private value: string, name: string) {
    super("string", name);
  }
  public getValue(): string {
    return this.value;
  }
}

export class NumberValueNode extends Node<KindOfNumber> {
  constructor(private value: number, name: string) {
    super("number", name);
  }
  public getValue(): number {
    return this.value;
  }
}

export type GetNode<T extends Kind> = T extends KindOfString ? StringValueNode : T extends KindOfNumber ? NumberValueNode : never;

export const getChildByPaths = (operator: Operator<string>) => <T extends Kind>(kind: T, path: string): GetNode<T> | undefined => {
  return operator.getChildByPaths(kind, path) as GetNode<T> | undefined;
};
