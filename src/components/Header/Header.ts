import './header.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup';
import Button from '../shared/Button/Button';
import { IRegistrationService } from '../shared/interfaces/registration-service-model';

class Header extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private registrationService: IRegistrationService,
    private changeCurrentPage: (path: string) => void,
    private hash: string
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private onRegistrationBtnClick = (): void => {
    const registrationPopup = new RegistrationPopup(
      this.registrationService,
      this.render
    );
    document.body.append(registrationPopup.node);
  };

  private onStartBtnClick = (): void => {
    this.changeCurrentPage('game');
  };

  private render = (): void => {
    this.node.innerHTML = '';
    const leftPartHeader = new BaseControl({
      tagName: 'div',
      classes: ['header__left'],
    });
    const rightPartHeader = new BaseControl({
      tagName: 'div',
      classes: ['header__right'],
    });

    const logotype = new Logo(
      {
        tagName: 'a',
        classes: ['header__logo', 'logo'],
      },
      this.changeCurrentPage
    );

    const nav = new Navigation(
      {
        tagName: 'ul',
        classes: ['header__navigation', 'navigation'],
      },
      this.changeCurrentPage,
      this.hash
    );

    if (this.registrationService.isAuthorization) {
      const startGameBtn = new Button(
        {
          tagName: 'a',
          classes: ['header__button', 'button'],
          text: window.location.hash !== '#game' ? 'Start Game' : 'Stop Game', // TODO: think about
        },
        this.onStartBtnClick
      );
      rightPartHeader.node.append(startGameBtn.node);
    } else {
      const registrationBtn = new Button(
        {
          tagName: 'a',
          classes: ['header__button', 'button'],
          text: 'register new player',
        },
        this.onRegistrationBtnClick
      );
      rightPartHeader.node.append(registrationBtn.node);
    }

    leftPartHeader.node.append(logotype.node, nav.node);

    this.node.append(leftPartHeader.node, rightPartHeader.node);
  };
}

export default Header;
