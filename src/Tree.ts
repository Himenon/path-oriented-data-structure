import type { Component, Children, ObjectItem } from "./types";
import { generateKey } from "./Utils";

export class Tree<Kind extends string> implements Component<Kind> {
  public key: string;
  private children: Children = {};
  constructor(public kind: Kind, public name: string) {
    this.key = generateKey(kind, name);
  }

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

  public getObject(): ObjectItem {
    const entires = Object.entries(this.children).map(([key, child]) => {
      return [key, child.getObject()];
    });
    return {
      name: this.name,
      children: Object.fromEntries(entires),
    };
  }

  public getChildren(): Component<string>[] {
    return Object.values(this.children);
  }

  public addComponent(pathName: string, component: Component): void {
    // console.log(`Tree:AddComponent: ${component.name}`);
    const key = generateKey(component.kind, pathName);
    this.children[key] = component;
  }

  public removeComponent(component: Component<string>): void {
    const entries = Object.entries(this.children).filter(([, item]) => {
      return !component.sameComponent(item);
    });
    this.children = Object.fromEntries(entries);
  }

  public sameComponent(component: Component<string>): boolean {
    return this.name === component.name && this.kind === component.kind;
  }
}
