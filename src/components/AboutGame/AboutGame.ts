import './aboutGame.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import AboutGameList from './AboutGameList/AboutGameList';
import ContainerWrapper from '../HOC/Container';

class AboutGame extends BaseControl {
  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    const title = new BaseControl({
      tagName: 'h2',
      classes: ['about-game__title'],
      text: 'How to play?',
    });

    const aboutGameList = new AboutGameList({
      tagName: 'ul',
      classes: ['about-game__list'],
    });

    wrapper.append(title.node, aboutGameList.node);
  }
}

export default AboutGame;
