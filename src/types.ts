export interface ObjectItem {
  name: string;
  children?: {
    [key: string]: ObjectItem;
  };
}

export interface Component {
  kind: string;
  name: string;
  key: string;
  getChildByPaths: (kind: string, paths: string[]) => Component | undefined;
  sameComponent: (component: Component) => boolean;
  addComponent: (pathName: string, component: Component) => void;
  removeComponent: (component: Component) => void;
  getChildren: () => Component[] | undefined;
  getObject: () => ObjectItem;
}

export interface Children {
  [key: string]: Component;
}
