import './normalize.css';
import { App, IApplication } from './app';

const app: IApplication = new App(document.getElementById('app'));
app.init();
