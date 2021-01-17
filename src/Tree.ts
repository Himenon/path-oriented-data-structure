import type { Component, Children, HierarchicalData } from "./types";
import { generateKey } from "./Utils";

export class Tree<Kind extends string> implements Component<Kind> {
  private children: Children = {};
  constructor(public kind: Kind, public name: string) {}

  public getChildByPaths(kind: string, paths: string[]): Component<string> | undefined {
    const [name, ...pathArray] = paths;
    const key = generateKey(kind, name);
    const component = this.children[key];
    if (!component) {
      return undefined;
    }
    if (pathArray.length === 0) {
      return component;
    }
    return component.getChildByPaths(kind, pathArray);
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
