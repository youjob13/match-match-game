import { IPropsToBaseControl } from '../../shared/interfaces/api';
import './navigation.scss';
import gearImg from '../../../assets/header/gear.svg';
import starImg from '../../../assets/header/star.svg';
import questionImg from '../../../assets/header/question.svg';

import BaseControl from '../../shared/BaseControl/BaseControl';
import NavigationItem from './NavigationItem/NavigationItem';

class Navigation extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private changeCurrentPage: (path: string) => void,
    private hash: string
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private onNavItemClick = (path: string): void => {
    this.changeCurrentPage(path);
  };

  render(): void {
    const aboutGame = new NavigationItem(
      {
        tagName: 'li',
        classes: [
          'navigation__item',
          this.hash === 'about-game' || this.hash === ''
            ? 'active'
            : 'non-active',
        ],
        text: 'About Game',
        iconUrl: questionImg,
        path: 'about-game',
      },
      this.onNavItemClick
    );

    const bestScore = new NavigationItem(
      {
        tagName: 'li',
        classes: [
          'navigation__item',
          this.hash === 'best-score' ? 'active' : 'non-active',
        ],
        text: 'Best Score',
        iconUrl: starImg,
        path: 'best-score',
      },
      this.onNavItemClick
    );

    const gameSettings = new NavigationItem(
      {
        tagName: 'li',
        classes: [
          'navigation__item',
          this.hash === 'settings' ? 'active' : 'non-active',
        ],
        text: 'Game Settings',
        iconUrl: gearImg,
        path: 'settings',
      },
      this.onNavItemClick
    );

    this.node.append(aboutGame.node, bestScore.node, gameSettings.node);
  }
}

export default Navigation;
