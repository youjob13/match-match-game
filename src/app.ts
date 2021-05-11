import './styles.scss';
import Header from './components/Header/Header';
import AboutGame from './components/AboutGame/AboutGame';

export interface IApplication {
  app: HTMLElement | null;

  init:() => void
}

export class App {
  constructor(readonly app: HTMLElement | null) {}

  init():void {
    if (!this.app) throw new Error('app is not founded');
    this.app.innerHTML = '<h1 class="h1-title">Match match game</h1>';
    const header = new Header({ tagName: 'header', classes: ['header'] });
    this.app.append(header.node);
    document.addEventListener('click', () => {
      console.log(window.location.hash);
    });

    const aboutGame = new AboutGame({ tagName: 'main', classes: ['about-game'] });
    this.app.append(aboutGame.node);
  }
}
