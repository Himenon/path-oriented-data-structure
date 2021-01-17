import type { Component, HierarchicalData } from "./types";
import { generateKey } from "./Utils";

export class Node<Kind extends string> implements Component<Kind> {
  private key: string;
  constructor(public kind: Kind, public name: string) {
    this.key = generateKey(kind, name);
  }

  public getChildren(): undefined {
    return undefined;
  }

  public hasChildren(): boolean {
    return false;
  }

  public getHierarchy(): HierarchicalData {
    return {
      name: this.name,
    };
  }

  public getChildByPaths(paths: string[], kind: string): Component | undefined {
    const [name] = paths;
    const key = generateKey(kind, name);
    if (this.key === key) {
      return this;
    }
    return undefined;
  }

  public set(): void {
    return;
  }

  public remove(): void {
    return;
  }

  public isSameComponent(component: Component<string>): boolean {
    return !component.getChildren() && this.kind === component.kind && this.name === component.name;
  }
}
