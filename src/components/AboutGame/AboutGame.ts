import './aboutGame.scss';
import BaseControl from '../BaseControl/BaseControl';
import AboutGameList from './AboutGameList/AboutGameList';
import ContainerWrapper from '../HOF/Container';

class AboutGame extends BaseControl {
  constructor(props: { tagName: string, classes: string[] }) {
    super(props);
    this.init();
  }

  init():void {
    this.render();
  }

  private render():void {
    const wrapper = ContainerWrapper(this.node);
    const title = new BaseControl({ tagName: 'h2', classes: ['about-game__title'], text: 'How to play?' });
    const aboutGameList = new AboutGameList({ tagName: 'ul', classes: ['about-game__list'] });
    wrapper.append(title.node, aboutGameList.node);
  }
}

export default AboutGame;
