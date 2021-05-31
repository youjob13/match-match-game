import { IRoute, IRouter } from '../interfaces/router-model';

class Router implements IRouter {
  constructor(private routes: IRoute[]) {}

  changePath = (path: string): void => {
    window.location.hash = path;
  };

  getHash = (): string => window.location.hash.slice(1);

  routeToPage(parentNode: HTMLElement): void {
    const defineCurrentPage = () =>
      this.routes.forEach(
        (route) =>
          route.path === this.getHash() && parentNode?.append(route.component())
      );

    defineCurrentPage();
  }
}

export default Router;
