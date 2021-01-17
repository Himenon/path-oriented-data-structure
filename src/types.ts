export interface HierarchicalData {
  name: string;
  children?: {
    [key: string]: HierarchicalData;
  };
}

export interface Component<Kind = string> {
  /** Tree or Node kinds. */
  kind: Kind;
  /** Tree or Node name. */
  name: string;
  getChildren: () => Children | undefined;
  hasChildren: () => boolean;
  getChildByPaths: (paths: string[], kind: string) => Component | undefined;
  getHierarchy: () => HierarchicalData;
  set: (pathName: string, component: Component) => void;
  remove: (component: Component) => void;
  isSameComponent: (component: Component) => boolean;
}

export interface Children {
  [key: string]: Component;
}
