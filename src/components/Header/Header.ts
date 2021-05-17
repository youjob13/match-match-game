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
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private onRegistrationBtnClick = (): void => {
    const registrationPopup = new RegistrationPopup(this.registrationService);
    document.body.append(registrationPopup.node);
  };

  private render(): void {
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
      this.changeCurrentPage
    );

    if (this.registrationService.isAuthorization) {
      const startGameBtn = new BaseControl({
        tagName: 'a',
        classes: ['header__button', 'button'],
        text: window.location.hash !== '#game' ? 'Start Game' : 'Stop Game', // TODO: think about
        attributes: { href: '#game' }, // TODO: callback to GameService
      });
      rightPartHeader.node.append(startGameBtn.node);
    } else {
      const registrationBtn = new Button(
        {
          tagName: 'a',
          classes: ['header__button', 'button'],
          text: 'register new player', // TODO: флаг авторезирован ли пользователь
        },
        this.onRegistrationBtnClick
      );
      rightPartHeader.node.append(registrationBtn.node);
    }

    leftPartHeader.node.append(logotype.node, nav.node);

    this.node.append(leftPartHeader.node, rightPartHeader.node);
  }
}

export default Header;
