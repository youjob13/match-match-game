export interface IRouter {
  getHash: () => void;
  changePath: (path: string) => void;
  routeToPage: (parentNode: HTMLElement) => void;
}

export interface IRoute {
  path: string;
  component: () => HTMLElement;
}
