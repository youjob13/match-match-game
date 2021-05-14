import './header.scss';
import BaseControl from '../BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import StartGameBtn from './StartGameBtn/StartGameBtn';

class Header extends BaseControl {
  private isStartedGame: boolean;

  private startGame: () => void;

  constructor(
    props: { tagName: string; classes: string[] },
    startGame: () => void,
    isStartedGame: boolean
  ) {
    super(props);
    this.isStartedGame = isStartedGame;
    this.startGame = startGame;
    this.init();
  }

  private init(): void {
    this.render();
  }

  private onStartGameBtnClick = (): void => {
    this.startGame();
  };

  private render(): void {
    const left = new BaseControl({ tagName: 'div', classes: ['header__left'] });
    const right = new BaseControl({
      tagName: 'div',
      classes: ['header__right'],
    });

    const logotype = new Logo({
      tagName: 'a',
      classes: ['header__logo', 'logo'],
    });
    logotype.node.setAttribute('href', '#');

    const nav = new Navigation({
      tagName: 'ul',
      classes: ['header__navigation', 'navigation'],
    });

    const startGameBtn = new StartGameBtn(
      {
        tagName: 'button',
        classes: ['header__button', 'button'],
        text: !this.isStartedGame ? 'Start Game' : 'Stop Game',
      },
      this.onStartGameBtnClick
    );

    left.node.append(logotype.node, nav.node);
    right.node.append(startGameBtn.node);

    this.node.append(left.node, right.node);
  }
}

export default Header;
