import './header.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup';
import Button from '../shared/Button/Button';
import { IRegistrationService } from '../shared/interfaces/registration-service-model';

import defaultUserAvatar from '../../assets/user_image_default.png';

class Header extends BaseControl<HTMLElement> {
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

  private onLogOutBtnClick = (): void => {
    this.registrationService.logOut();
    this.render();
  };

  private render = (): void => {
    this.node.innerHTML = '';
    const leftPartHeader = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['header__left'],
    });
    const rightPartHeader = new BaseControl<HTMLElement>({
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
          text: this.hash !== 'game' ? 'Start Game' : 'Stop Game',
        },
        this.onStartBtnClick
      );

      const logOut = new Button(
        {
          tagName: 'a',
          classes: ['header__button', 'button'],
          text: 'Log out',
        },
        this.onLogOutBtnClick
      );

      const userAvatar = new BaseControl<HTMLElement>({
        tagName: 'img',
        classes: ['header__user-avatar'],
        attributes: { src: defaultUserAvatar, alt: '' },
      });
      rightPartHeader.node.append(
        startGameBtn.node,
        userAvatar.node,
        logOut.node
      );
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
