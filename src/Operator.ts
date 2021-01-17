import type { Component, HierarchicalData } from "./types";
import { Tree } from "./Tree";
import { split } from "./Utils";

export class Operator<TreeKind extends string> {
  private rootTree: Tree<TreeKind>;
  constructor(private treeKind: TreeKind, private delimiter: string = "/") {
    this.rootTree = new Tree(treeKind, ".");
  }

  public getObject(): HierarchicalData {
    return this.rootTree.getHierarchy();
  }

  public getComponent(kind: string, path: string): Component | undefined {
    const pathArray = split(path, this.delimiter);
    return this.rootTree.getChildByPaths(kind, pathArray);
  }

  private createOrAddComponent(component: Component, currentPath: string, previousPathArray: string[], nextPathArray: string[]) {
    const childComponent = this.rootTree.getChildByPaths(component.kind, nextPathArray);
    if (childComponent || nextPathArray.length === 0) {
      return;
    }
    if (previousPathArray.length === 0 && nextPathArray.length === 1) {
      this.rootTree.set(nextPathArray[0], component);
    } else {
      const parentComponent = this.rootTree.getChildByPaths(this.treeKind, previousPathArray);
      parentComponent && parentComponent.set(currentPath, component);
    }
  }

  public addComponent(path: string, component: Component): void {
    const pathArray = split(path, this.delimiter);
    const pathArrayLength = pathArray.length;
    pathArray.reduce<string[]>((previousPathArray, currentPath, currentIndex) => {
      const nextPathArray = previousPathArray.concat(currentPath);
      const isLastIndex = currentIndex === pathArrayLength - 1;
      if (isLastIndex) {
        this.createOrAddComponent(component, currentPath, previousPathArray, nextPathArray);
      } else {
        this.createOrAddComponent(new Tree(this.treeKind, currentPath), currentPath, previousPathArray, nextPathArray);
      }
      return nextPathArray;
    }, []);
  }
}
