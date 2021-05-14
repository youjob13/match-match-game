import './styles.scss';
import Header from './components/Header/Header';
import AboutGame from './components/AboutGame/AboutGame';
import BaseControl from './components/BaseControl/BaseControl';
import Game from './components/Game/Game';
import BestScore from './components/BestScore/BestScore';

interface IApplication {
  app: HTMLElement | null;
  routes: Array<Route>;
  currentPage: AboutGame | BaseControl | null;
}

interface Route {
  path: string;
  component: () => HTMLElement;
}

class App implements IApplication {
  routes: Array<Route>;

  isStartedGame: boolean;

  // TODO: find info about many types
  currentPage: AboutGame | BaseControl | Game | BestScore | null;

  constructor(readonly app: HTMLElement | null) {
    this.app = app;
    this.currentPage = null;
    this.routes = [
      {
        path: '',
        component: (): HTMLElement => {
          this.currentPage = new AboutGame({
            tagName: 'main',
            classes: ['about-game'],
          });
          return this.currentPage?.node;
        },
      },
      {
        path: 'about-game',
        component: (): HTMLElement => {
          this.currentPage = new AboutGame({
            tagName: 'main',
            classes: ['about-game'],
          });
          return this.currentPage?.node;
        },
      },
      {
        path: 'best-score',
        component: (): HTMLElement => {
          this.currentPage = new BestScore({
            tagName: 'main',
            classes: ['best-score'],
          });
          return this.currentPage?.node;
        },
      },
      {
        path: 'game',
        component: (): HTMLElement => {
          this.currentPage = new Game({ tagName: 'main', classes: ['game'] });
          return this.currentPage?.node;
        },
      },
    ];
    this.isStartedGame = false;
  }

  init(): void {
    this.render(window.location.hash);
    this.eventListeners();
  }

  private render(hash: string): void {
    if (hash.slice(1) !== 'game') {
      if (this.currentPage && this.currentPage instanceof Game) {
        this.currentPage.timer.stop();
      }
    } // TODO: think about
    if (!this.app) throw new Error('app is not founded');

    this.app.innerHTML = '<h1 class="h1-title">Match match game</h1>';
    const header = new Header({ tagName: 'header', classes: ['header'] });
    this.app.append(header.node);

    const getHash = (): string => hash.slice(1);
    const defineCurrentPage = () =>
      this.routes.forEach(
        (route) =>
          route.path === getHash() && this.app?.append(route.component())
      );

    defineCurrentPage();
  }

  private eventListeners(): void {
    window.onpopstate = () => this.render(window.location.hash);
  }
}

export default App;
