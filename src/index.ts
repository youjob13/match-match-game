import './normalize.css';
import App from './app';
import { IApplication } from './components/shared/interfaces/app-model/app-model';

const rootElem: HTMLElement | null = document.getElementById('app');

const app: IApplication = new App(rootElem);
app.init();
