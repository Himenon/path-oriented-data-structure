import type { Component, HierarchicalData } from "./types";
import { Tree } from "./Tree";
import { split } from "./Utils";

export class Operator<TreeKind extends string> {
  private tree: Tree<TreeKind>;
  constructor(private treeKind: TreeKind, private delimiter: string = "/") {
    this.tree = new Tree(treeKind, ".");
  }

  private setToRootOrParent(component: Component, currentPathName: string, previousPathArray: string[], nextPathArray: string[]): void {
    const childComponent = this.tree.getChildByPaths(nextPathArray, component.kind);
    if (childComponent || nextPathArray.length === 0) {
      return;
    }
    if (previousPathArray.length === 0 && nextPathArray.length === 1) {
      this.tree.set(nextPathArray[0], component);
    } else {
      const parentComponent = this.tree.getChildByPaths(previousPathArray, this.treeKind);
      parentComponent && parentComponent.set(currentPathName, component);
    }
  }

  private removeFromRootOrParent(currentPathName: string, currentPathArray: string[], component: Component): void {
    const previousPathArray: string[] = currentPathArray.slice(0, currentPathArray.length - 1);
    if (previousPathArray.length === 0 && currentPathArray.length === 1) {
      this.tree.remove(currentPathName, component);
    } else {
      const parentComponent = this.tree.getChildByPaths(previousPathArray, this.treeKind);
      parentComponent && parentComponent.remove(currentPathName, component);
    }
  }

  public getHierarchy(): HierarchicalData {
    return this.tree.getHierarchy();
  }

  public getChildByPaths(path: string, kind: string): Component | undefined {
    const pathArray = split(path, this.delimiter);
    return this.tree.getChildByPaths(pathArray, kind);
  }

  public set(path: string, component: Component): void {
    const pathArray = split(path, this.delimiter);
    const pathArrayLength = pathArray.length;
    pathArray.reduce<string[]>((previousPathArray, currentPathName, currentIndex) => {
      const nextPathArray = previousPathArray.concat(currentPathName);
      const isLastIndex = currentIndex === pathArrayLength - 1;
      if (isLastIndex) {
        this.setToRootOrParent(component, currentPathName, previousPathArray, nextPathArray);
      } else {
        const tree = new Tree(this.treeKind, currentPathName);
        this.setToRootOrParent(tree, currentPathName, previousPathArray, nextPathArray);
      }
      return nextPathArray;
    }, []);
  }

  public remove(path: string, kind: string): void {
    const pathArray = split(path, this.delimiter);
    const pathArrayLength = pathArray.length;
    for (let i = 0; i <= pathArrayLength; i++) {
      const currentPathArray = pathArray.slice(0, pathArrayLength - i);
      const currentPathName = pathArray[pathArrayLength - i - 1];
      if (!currentPathName) {
        continue;
      }
      if (i === 0) {
        const component = this.tree.getChildByPaths(currentPathArray, kind);
        component && this.removeFromRootOrParent(currentPathName, currentPathArray, component);
      } else {
        const component = this.tree.getChildByPaths(currentPathArray, this.treeKind);
        component && component.hasChildren() && this.removeFromRootOrParent(currentPathName, currentPathArray, component);
      }
    }
  }

  public copy(from: string, to: string, kind: string): boolean {
    const fromComponent = this.getChildByPaths(from, kind);
    const toComponent = this.getChildByPaths(to, kind);
    if (toComponent || !fromComponent) {
      return false;
    }
    this.set(to, fromComponent);
    return true;
  }

  public move(from: string, to: string, kind: string): boolean {
    const success = this.copy(from, to, kind);
    if (success) {
      this.remove(from, kind);
      return true;
    }
    return false;
  }
}
