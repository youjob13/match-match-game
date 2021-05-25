import './normalize.css';
import App from './app';
import RegistrationService from './components/services/RegistrationService';
import GameService from './components/services/GameService';
import BestScoreService from './components/services/BestScoreService';
import { IApplication } from './components/shared/interfaces/app-model';

const registrationService = new RegistrationService();
const gameService = new GameService();
const bestScoreService = new BestScoreService();

const rootElem: HTMLElement | null = document.getElementById('app');

const app: IApplication = new App(
  rootElem,
  registrationService,
  gameService,
  bestScoreService
);
app.init();
