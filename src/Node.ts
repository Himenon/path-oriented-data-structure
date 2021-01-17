import type { Component, HierarchicalData } from "./types";

export class Node<Kind extends string> implements Component<Kind> {
  constructor(public kind: Kind, public name: string) {}

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

  public getChildByPaths(): undefined {
    return undefined;
  }

  public set(): void {
    return;
  }

  public remove(): void {
    return;
  }
}
