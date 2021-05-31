import { IRoute } from './router-model';

export interface IApplication {
  routes: IRoute[];
  init: () => void;
}
