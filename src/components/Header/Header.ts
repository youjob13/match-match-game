import './header.scss';
import BaseControl from '../BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

class Header extends BaseControl {
  constructor(props: { tagName: string, classes: string[] }) {
    super(props);
    this.init();
  }

  init():void {
    this.render();
  }

  private render():void {
    const logotype = new Logo({ tagName: 'a', classes: ['header__logo', 'logo'] });
    logotype.node.setAttribute('href', '#');
    this.node.append(logotype.node);
    const nav = new Navigation({ tagName: 'ul', classes: ['header__navigation', 'navigation'] });
    this.node.append(nav.node);
  }
}

export default Header;
