import './bestScore.scss';

import BaseControl from '../BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';

class BestScore extends BaseControl {
  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);
    const title = new BaseControl({
      tagName: 'h2',
      classes: ['best-score__title'],
      text: 'Best players',
    });

    wrapper.append(title.node);
  }
}

export default BestScore;
