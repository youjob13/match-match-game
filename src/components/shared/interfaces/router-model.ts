export interface IRouter {
  getHash: () => string;
  changePath: (path: string) => void;
  routeToPage: (parentNode: HTMLElement) => void;
}

export interface IRoute {
  path: string;
  component: () => HTMLElement;
}
