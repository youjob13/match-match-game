import './header.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
// import StartGameBtn from './StartGameBtn/StartGameBtn';

class Header extends BaseControl {
  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const leftPartHeader = new BaseControl({
      tagName: 'div',
      classes: ['header__left'],
    });
    const rightPartHeader = new BaseControl({
      tagName: 'div',
      classes: ['header__right'],
    });

    const logotype = new Logo({
      tagName: 'a',
      classes: ['header__logo', 'logo'],
      attributes: { href: '#' },
    });

    const nav = new Navigation({
      tagName: 'ul',
      classes: ['header__navigation', 'navigation'],
    });

    const startGameBtn = new BaseControl({
      tagName: 'a',
      classes: ['header__button', 'button'],
      text: window.location.hash !== '#game' ? 'Start Game' : 'Stop Game', // TODO: think about
      attributes: { href: '#game' },
    });

    leftPartHeader.node.append(logotype.node, nav.node);
    rightPartHeader.node.append(startGameBtn.node);

    this.node.append(leftPartHeader.node, rightPartHeader.node);
  }
}

export default Header;
