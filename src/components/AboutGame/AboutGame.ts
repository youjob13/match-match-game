import './aboutGame.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import AboutGameList from './AboutGameList/AboutGameList';
import ContainerWrapper from '../shared/HOC/Container';
import { IPropsToBaseControl } from '../shared/interfaces/api';

class AboutGame extends BaseControl<HTMLElement> {
  constructor(propsToBaseControl: IPropsToBaseControl) {
    super(propsToBaseControl);
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    const title = new BaseControl<HTMLElement>({
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
