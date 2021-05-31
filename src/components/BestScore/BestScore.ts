import './bestScore.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../shared/HOC/Container';
import BestScoreList from './BestScoreList/BestScoreList';
import { IBestScoreService } from '../shared/interfaces/best-score-service-model';
import { IPropsToBaseControl } from '../shared/interfaces/api';

class BestScore extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
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

    const title = new BaseControl<HTMLElement>({
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
