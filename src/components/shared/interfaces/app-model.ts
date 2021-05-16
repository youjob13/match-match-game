import { Page } from '../../../app';
import { IRoute } from './route-model';
import { ISetting } from './setting-model';

export interface IApplication {
  app: HTMLElement | null;
  routes: Array<IRoute>;
  currentPage: Page;
  currentSettings: ISetting;
  init: () => void;
}
