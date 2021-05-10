import './header.scss';
import BaseControl from '../BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

class Header extends BaseControl {
  constructor(tagName: string, classes: string[]) {
    super(tagName, classes);
    this.init();
  }

  private init():void {
    const logotype = new Logo('div', ['header__logo', 'logo']);
    this.node.append(logotype.node);
    const nav = new Navigation('ul', ['header__navigation', 'navigation']);
    this.node.append(nav.node);
  }
}

export default Header;
