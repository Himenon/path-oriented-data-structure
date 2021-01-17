import type { Component, Children, HierarchicalData } from "./types";
import { generateKey } from "./Utils";

export class Tree<Kind extends string> implements Component<Kind> {
  private children: Children = {};
  constructor(public kind: Kind, public name: string) {}

  public getChildByPaths(paths: string[], kind: string): Component<string> | undefined {
    const [name, ...pathArray] = paths;
    if (!name) {
      return;
    }
    if (pathArray.length === 0) {
      const component = this.children[generateKey(kind, name)];
      return component;
    }
    const childTree = this.children[generateKey(this.kind, name)];
    return childTree && childTree.getChildByPaths(pathArray, kind);
  }

  public getHierarchy(): HierarchicalData {
    const entires = Object.entries(this.children).map(([key, child]) => {
      return [key, child.getHierarchy()];
    });
    return {
      name: this.name,
      children: Object.fromEntries(entires),
    };
  }

  public getChildren(): Children {
    return this.children;
  }

  public hasChildren(): boolean {
    return Object.keys(this.children).length === 0;
  }

  public set(pathName: string, component: Component): void {
    const key = generateKey(component.kind, pathName);
    this.children[key] = component;
  }

  public remove(component: Component<string>): void {
    const entries = Object.entries(this.children).filter(([, item]) => {
      return !component.isSameComponent(item);
    });
    this.children = Object.fromEntries(entries);
  }

  public isSameComponent(component: Component<string>): boolean {
    return !!component.getChildren() && this.kind === component.kind && this.name === component.name;
  }
}
