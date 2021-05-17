import './normalize.css';
import App from './app';
import { IApplication } from './components/shared/interfaces/app-model';
import RegistrationService from './components/services/RegistrationService';

const registrationService = new RegistrationService();
const rootElem: HTMLElement | null = document.getElementById('app');

const app: IApplication = new App(rootElem, registrationService);
app.init();
