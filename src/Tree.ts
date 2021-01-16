import type { Component, Children, ObjectItem } from "./types";
import { generateKey } from "./Utils";

export const Kind = "tree" as const;

export class Tree implements Component {
  public kind = Kind;
  public key: string;
  private children: Children = {};
  constructor(public name: string) {
    this.key = generateKey(this.kind, name);
  }

  public getChildByPaths(kind: string, paths: string[]): Component | undefined {
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

  public getObject(): ObjectItem {
    const entires = Object.entries(this.children).map(([key, child]) => {
      return [key, child.getObject()];
    });
    return {
      name: this.name,
      children: Object.fromEntries(entires),
    };
  }

  public getChildren(): Component[] {
    return Object.values(this.children);
  }

  public addComponent(pathName: string, component: Component): void {
    // console.log(`Tree:AddComponent: ${component.name}`);
    const key = generateKey(component.kind, pathName);
    this.children[key] = component;
  }

  public removeComponent(component: Component): void {
    const entries = Object.entries(this.children).filter(([, item]) => {
      return !component.sameComponent(item);
    });
    this.children = Object.fromEntries(entries);
  }

  public sameComponent(component: Component): boolean {
    return this.name === component.name && this.kind === component.kind;
  }
}
