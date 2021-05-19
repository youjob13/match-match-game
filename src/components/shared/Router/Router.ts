import { IRoute } from '../interfaces/route-model';

class Router {
  constructor(private routes: Array<IRoute>) {}

  changePath = (path: string): void => {
    window.location.hash = path;
  };

  routeToPage(parentNode: HTMLElement): void {
    const { hash } = window.location;
    const getHash = (): string => hash.slice(1);
    const defineCurrentPage = () =>
      this.routes.forEach(
        (route) =>
          route.path === getHash() && parentNode?.append(route.component())
      );

    defineCurrentPage();
  }
}

export default Router;
