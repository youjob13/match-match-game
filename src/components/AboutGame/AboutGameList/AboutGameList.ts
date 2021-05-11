import './aboutGameList.scss';

import imageOne from '../../../assets/about-game/1.png';
import imageTwo from '../../../assets/about-game/2.png';
import imageThree from '../../../assets/about-game/3.png';

import BaseControl from '../../BaseControl/BaseControl';
import AboutGameItem from './AboutGameItem/AboutGameItem';

class AboutGameList extends BaseControl {
  constructor(tagName: string, classes: string[]) {
    super(tagName, classes);
    this.init();
  }

  init():void {
    const itemOne = new AboutGameItem('li', ['about-game__item'], 'Register new player in game', imageOne);
    const itemTwo = new AboutGameItem('li', ['about-game__item'], 'Configure your game settings', imageTwo);
    const itemThree = new AboutGameItem('li', ['about-game__item'],
      'Start you new game! Remember card positions and match it before times up.', imageThree);

    this.node.append(itemOne.node, itemTwo.node, itemThree.node);
  }
}

export default AboutGameList;
