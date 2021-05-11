import './aboutGameList.scss';

import imageOne from '../../../assets/about-game/1.png';
import imageTwo from '../../../assets/about-game/2.png';
import imageThree from '../../../assets/about-game/3.png';

import BaseControl from '../../BaseControl/BaseControl';
import AboutGameItem from './AboutGameItem/AboutGameItem';

class AboutGameList extends BaseControl {
  constructor(props: { tagName: string, classes: string[] }) {
    super(props);
    this.init();
  }

  init():void {
    this.render();
  }

  render():void {
    const itemOne = new AboutGameItem({
      tagName: 'li',
      classes: ['about-game__item'],
      text: 'Register new player in game',
      image: imageOne,
    });
    const itemTwo = new AboutGameItem({
      tagName: 'li',
      classes: ['about-game__item'],
      text: 'Configure your game settings',
      image: imageTwo,
    });
    const itemThree = new AboutGameItem({
      tagName: 'li',
      classes: ['about-game__item'],
      text: 'Start you new game! Remember card positions and match it before times up.',
      image: imageThree,
    });

    this.node.append(itemOne.node, itemTwo.node, itemThree.node);
  }
}

export default AboutGameList;
