import './styles.scss';
import Header from './components/Header/Header';
import AboutGame from './components/AboutGame/AboutGame';
import BaseControl from './components/BaseControl/BaseControl';
import Game from './components/Game/Game';

interface IApplication {
  app: HTMLElement | null;
  routes: Array<Route>;
  currentPage: AboutGame | BaseControl | null;

  init:() => void
  // private render:  () =>  void
  // private eventListeners:() => void
}

interface Route {
  path: string;
  component:() => HTMLElement;
}

class App implements IApplication {
  routes: Array<Route>;

  // TODO: find info
  currentPage: AboutGame | BaseControl | null;

  constructor(readonly app: HTMLElement | null) {
    this.app = app;
    this.currentPage = null;
    this.routes = [
      {
        path: '',
        component: ():HTMLElement => {
          this.currentPage = new AboutGame({ tagName: 'main', classes: ['about-game'] });
          return this.currentPage?.node;
        },
      },
      {
        path: 'about-game',
        component: ():HTMLElement => {
          this.currentPage = new AboutGame({ tagName: 'main', classes: ['about-game'] });
          return this.currentPage?.node;
        },
      },
      {
        path: 'best-score',
        component: ():HTMLElement => {
          this.currentPage = new BaseControl({ tagName: 'main', classes: ['about-game'], text: '404' });
          return this.currentPage?.node;
        },
      },
    ];
  }

  init():void {
    this.render(window.location.hash);
    this.eventListeners();
  }

  private render(hash: string):void {
    if (!this.app) throw new Error('app is not founded');

    this.app.innerHTML = '<h1 class="h1-title">Match match game</h1>';
    const header = new Header({ tagName: 'header', classes: ['header'] });
    this.app.append(header.node);

    const game = new Game({ tagName: 'main', classes: ['game'] });
    this.app.append(game.node);

    // const getHash = ():string => hash.slice(1);
    // const defineCurrentPage = () => this.routes.forEach((route) => route.path === getHash()
    //     && this.app?.append(route.component()));

    // defineCurrentPage();
  }

  private eventListeners():void {
    window.onpopstate = () => this.render(window.location.hash);
  }
}

export default App;
