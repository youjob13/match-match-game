import { Page } from '../../../app';
import { IRoute } from './route-model';

export interface IApplication {
  app: HTMLElement | null;
  routes: Array<IRoute>;
  currentPage: Page;
  init: () => void;
}
