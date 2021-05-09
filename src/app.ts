import './styles.scss';

export interface IApplication {
  app: HTMLElement | null;

  init:() => void
}

export class App {
  constructor(readonly app: HTMLElement | null) {}

  init():void {
    if (!this.app) throw new Error('app is not founded');
    this.app.innerHTML = 'application';
  }
}
