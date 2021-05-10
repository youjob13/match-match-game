import './navigation.scss';
import gearImg from '../../../assets/header/gear.svg';
import starImg from '../../../assets/header/star.svg';
import questionImg from '../../../assets/header/question.svg';

import BaseControl from '../../BaseControl/BaseControl';
import NavigationItem from './NavigationItem/NavigationItem';

class Navigation extends BaseControl {
  constructor(tagName: string, classes: string[]) {
    super(tagName, classes);
    this.create();
  }

  create(): void {
    const aboutGame = new NavigationItem('li', ['navigation__item'], 'About Game', questionImg);
    const bestScore = new NavigationItem('li', ['navigation__item'], 'Best Score', starImg);
    const gameSettings = new NavigationItem('li', ['navigation__item'], 'Game Settings', gearImg);
    this.node.append(aboutGame.node, bestScore.node, gameSettings.node);
  }
}

export default Navigation;
