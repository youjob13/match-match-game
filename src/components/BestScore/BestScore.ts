import './bestScore.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import BestScoreList from './BestScoreList/BestScoreList';
import { IBestScoreService } from '../shared/interfaces/best-score-service-model';

class BestScore extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private bestScoreService: IBestScoreService
  ) {
    super(propsToBaseControl);
    this.init();
  }

  async init(): Promise<void> {
    await this.bestScoreService.getScoreData();
    await this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    const title = new BaseControl({
      tagName: 'h2',
      classes: ['best-score__title'],
      text: 'Best players',
    });

    const bestScoreList = new BestScoreList(
      {
        tagName: 'ul',
        classes: ['best-score__list'],
      },
      this.bestScoreService
    );

    wrapper.append(title.node, bestScoreList.node);
  }
}

export default BestScore;
