import { IGameService } from './components/services/GameService';
import './styles.scss';
import Header from './components/Header/Header';
import AboutGame from './components/AboutGame/AboutGame';
import Game from './components/Game/Game';
import BestScore from './components/BestScore/BestScore';
import GameSettings from './components/GameSettings/GameSettings';
import { IRoute } from './components/shared/interfaces/route-model';
import getCards from './components/api/CardsApi';
import { ICardsJSON } from './components/shared/interfaces/card-model-json';
import Router from './components/shared/Router/Router';
import { IRegistrationService } from './components/shared/interfaces/registration-service-model';

export type Page = AboutGame | GameSettings | Game | BestScore | null;

class App {
  readonly routes: Array<IRoute>;

  router: any;

  currentPage: Page;

  currentSettings: any; // TODO: remove any

  constructor(
    readonly app: HTMLElement | null,
    private registrationService: IRegistrationService,
    private gameService: IGameService
  ) {
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
          this.currentPage = new Game(
            { tagName: 'main', classes: ['game'] },
            this.changeCurrentPage,
            this.gameService
          );
          return this.currentPage?.node;
        },
      },
      {
        path: 'settings',
        component: (): HTMLElement => {
          this.currentPage = new GameSettings(
            {
              tagName: 'main',
              classes: ['game-settings'],
            },
            this.gameService
          );
          return this.currentPage?.node;
        },
      },
    ];
    this.router = new Router(this.routes);
    this.currentSettings = {
      category: 'animal',
      difficulty: '4 * 4',
    };
  }

  private changeCurrentPage = (path: string): void => {
    this.router.changePath(path);
  };

  init(): void {
    this.render();
    this.eventListeners();
  }

  // private getData = async (): Promise<Array<ICardsJSON>> => {
  //   // TODO: remove
  //   const data = await getCards();
  //   return data;
  // };

  private render(): void {
    const { hash } = window.location;
    if (hash.slice(1) !== 'game') {
      if (this.currentPage && this.currentPage instanceof Game) {
        this.currentPage.timer.stop();
      } // TODO: think about (game should stopped in other component?)
    }

    if (!this.app) throw new Error('app is not founded');

    this.app.innerHTML = '<h1 class="h1-title">Match match game</h1>';
    const header = new Header(
      { tagName: 'header', classes: ['header'] },
      this.registrationService,
      this.changeCurrentPage
    );
    this.app.append(header.node);

    this.router.routeToPage(this.app);
  }

  private eventListeners(): void {
    window.onpopstate = () => this.render();
  }
}

export default App;
