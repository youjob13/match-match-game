import './aboutGame.scss';
import BaseControl from '../BaseControl/BaseControl';
import AboutGameList from './AboutGameList/AboutGameList';
import ContainerWrapper from '../HOF/Container';

class AboutGame extends BaseControl {
  constructor(tagName: string, classes: string[]) {
    super(tagName, classes);
    this.init();
  }

  private init() {
    const wrapper = ContainerWrapper(this.node);
    const title = new BaseControl('h2', ['about-game__title'], 'How to play?');
    const aboutGameList = new AboutGameList('ul', ['about-game__list']);
    wrapper.append(title.node, aboutGameList.node);
  }
}

export default AboutGame;
