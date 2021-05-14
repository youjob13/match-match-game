import './normalize.css';
import App from './app';

const rootElem: HTMLElement | null = document.getElementById('app');

const app = new App(rootElem);
app.init();
