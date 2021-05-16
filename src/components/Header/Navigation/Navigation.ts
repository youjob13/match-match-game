import './navigation.scss';
import gearImg from '../../../assets/header/gear.svg';
import starImg from '../../../assets/header/star.svg';
import questionImg from '../../../assets/header/question.svg';

import BaseControl from '../../shared/BaseControl/BaseControl';
import NavigationItem from './NavigationItem/NavigationItem';

class Navigation extends BaseControl {
  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.init();
  }

  init(): void {
    this.render();
  }

  render(): void {
    const aboutGame = new NavigationItem(
      {
        tagName: 'li',
        classes: ['navigation__item'],
        text: 'About Game',
      },
      { iconUrl: questionImg, path: 'about-game' }
    );

    const bestScore = new NavigationItem(
      {
        tagName: 'li',
        classes: ['navigation__item'],
        text: 'Best Score',
      },
      { iconUrl: starImg, path: 'best-score' }
    );

    const gameSettings = new NavigationItem(
      {
        tagName: 'li',
        classes: ['navigation__item'],
        text: 'Game Settings',
      },
      { iconUrl: gearImg, path: 'settings' }
    );

    this.node.append(aboutGame.node, bestScore.node, gameSettings.node);
  }
}

export default Navigation;
