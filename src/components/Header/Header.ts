import './header.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup';
import Button from '../shared/Button/Button';
import defaultUserAvatar from '../../assets/user_image_default.png';
import { IRegistrationService } from '../shared/interfaces/registration-service-model';
import { IPropsToBaseControl } from '../shared/interfaces/api';

class Header extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
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

  private onStopBtnClick = (): void => {
    this.changeCurrentPage('about-game');
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

    const { currentUser } = this.registrationService;
    if (this.registrationService.isAuthorization && currentUser) {
      let currentButton: Button;

      if (this.hash !== 'game') {
        const startGameBtn = new Button(
          {
            tagName: 'a',
            classes: ['header__button', 'button'],
            text: 'Start Game',
          },
          this.onStartBtnClick
        );
        currentButton = startGameBtn;
      } else {
        const stopGameBtn = new Button(
          {
            tagName: 'a',
            classes: ['header__button', 'button'],
            text: 'Stop Game',
          },
          this.onStopBtnClick
        );
        currentButton = stopGameBtn;
      }

      const userName = new BaseControl<HTMLElement>({
        tagName: 'p',
        classes: ['header__user-name'],
        text: currentUser.firstName,
      });

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
      });

      if (currentUser.avatar) {
        const baseImage = new Image();
        baseImage.onload = () => {
          userAvatar.node.setAttribute('src', <string>currentUser.avatar);
        };
        baseImage.src = currentUser.avatar;
      } else {
        userAvatar.node.setAttribute('src', defaultUserAvatar);
      }

      rightPartHeader.node.append(
        currentButton.node,
        userName.node,
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
