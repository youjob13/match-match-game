import './normalize.css';
import App from './app';
import { IApplication } from './components/shared/interfaces/app-model';
import RegistrationService from './components/services/RegistrationService';
import GameService from './components/services/GameService';

const registrationService = new RegistrationService();
const gameService = new GameService();
const rootElem: HTMLElement | null = document.getElementById('app');

const app: IApplication = new App(rootElem, registrationService, gameService);
app.init();
