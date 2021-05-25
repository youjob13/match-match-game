import { IRoute } from './route-model';

export interface IApplication {
  app: HTMLElement | null;
  routes: IRoute[];
  init: () => void;
}
