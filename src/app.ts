import './styles.scss';
import Router from './components/shared/Router/Router';
import Header from './components/Header/Header';
import AboutGame from './components/AboutGame/AboutGame';
import BestScore from './components/BestScore/BestScore';
import GameSettings from './components/GameSettings/GameSettings';
import Game from './components/Game/Game';
import IndexedDB from './components/services/IndexedDB';
import { IRoute } from './components/shared/interfaces/route-model';
import { IRegistrationService } from './components/shared/interfaces/registration-service-model';
import { IBestScoreService } from './components/shared/interfaces/best-score-service-model';
import { IGameService } from './components/shared/interfaces/game-service-model';
import { IIndexedDB } from './components/shared/interfaces/indexed-db-data-model';

export type Page = AboutGame | GameSettings | Game | BestScore | null;

class App {
  readonly routes: IRoute[];

  private router: Router;

  private currentPage: Page;

  constructor(
    readonly app: HTMLElement | null,
    private registrationService: IRegistrationService,
    private gameService: IGameService,
    private bestScoreService: IBestScoreService
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
          this.currentPage = new BestScore(
            {
              tagName: 'main',
              classes: ['best-score'],
            },
            this.bestScoreService
          );
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
  }

  private changeCurrentPage = (path: string): void => {
    this.router.changePath(path);
  };

  private initIndexedDB = async () => {
    const db: IIndexedDB = await new IndexedDB('youjob13', 1);
    await db.openReq([
      ['users', { keyPath: 'id', autoIncrement: true }],
      ['score', { keyPath: 'id', autoIncrement: true }],
    ]);
  };

  private render(): void {
    const hash = this.router.getHash();

    if (!this.app) throw new Error('app is not founded');

    this.app.innerHTML = '<h1 class="h1-title">Match match game</h1>';
    const header = new Header(
      { tagName: 'header', classes: ['header'] },
      this.registrationService,
      this.changeCurrentPage,
      hash
    );
    this.app.append(header.node);

    this.router.routeToPage(this.app);
  }

  private eventListeners(): void {
    window.onpopstate = () => this.render();
  }

  init(): void {
    this.initIndexedDB();
    this.render();
    this.eventListeners();
  }
}

export default App;
