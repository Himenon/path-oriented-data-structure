import type { Component, ObjectItem } from "./types";
import { generateKey } from "./Utils";

export class Node<Kind extends string> implements Component<Kind> {
  public key: string;
  constructor(public kind: Kind, public name: string) {
    this.key = generateKey(kind, name);
  }

  public getChildren(): undefined {
    return undefined;
  }

  public getObject(): ObjectItem {
    return {
      name: this.name,
    };
  }

  public getChildByPaths(kind: string, paths: string[]): Component | undefined {
    const [name] = paths;
    const key = generateKey(kind, name);
    if (this.key === key) {
      return this;
    }
    return undefined;
  }

  public addComponent(): void {
    return;
  }

  public removeComponent(): void {
    return;
  }

  public sameComponent(component: Component<string>): boolean {
    return this.name === component.name && this.kind === component.kind;
  }
}
