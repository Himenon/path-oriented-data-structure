import type { Component, HierarchicalData } from "./types";
import { Tree } from "./Tree";
import { split } from "./Utils";

export class Operator<TreeKind extends string> {
  private tree: Tree<TreeKind>;
  constructor(private treeKind: TreeKind, private delimiter: string = "/") {
    this.tree = new Tree(treeKind, ".");
  }

  private setToRootOrParent(component: Component, currentPath: string, previousPathArray: string[], nextPathArray: string[]): void {
    const childComponent = this.tree.getChildByPaths(component.kind, nextPathArray);
    if (childComponent || nextPathArray.length === 0) {
      return;
    }
    if (previousPathArray.length === 0 && nextPathArray.length === 1) {
      this.tree.set(nextPathArray[0], component);
    } else {
      const parentComponent = this.tree.getChildByPaths(this.treeKind, previousPathArray);
      parentComponent && parentComponent.set(currentPath, component);
    }
  }

  public getHierarchy(): HierarchicalData {
    return this.tree.getHierarchy();
  }

  public getChildByPaths(kind: string, path: string): Component | undefined {
    const pathArray = split(path, this.delimiter);
    return this.tree.getChildByPaths(kind, pathArray);
  }

  public set(path: string, component: Component): void {
    const pathArray = split(path, this.delimiter);
    const pathArrayLength = pathArray.length;
    pathArray.reduce<string[]>((previousPathArray, currentPath, currentIndex) => {
      const nextPathArray = previousPathArray.concat(currentPath);
      const isLastIndex = currentIndex === pathArrayLength - 1;
      if (isLastIndex) {
        this.setToRootOrParent(component, currentPath, previousPathArray, nextPathArray);
      } else {
        this.setToRootOrParent(new Tree(this.treeKind, currentPath), currentPath, previousPathArray, nextPathArray);
      }
      return nextPathArray;
    }, []);
  }
}
