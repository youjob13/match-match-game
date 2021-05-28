import { IBestScoreService } from '../../shared/interfaces/best-score-service-model';
import './bestScoreList.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';
import BestScoreItem from './BestScoreItem/BestScoreItem';

class BestScoreList extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private bestScoreService: IBestScoreService
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private render(): void {
    this.bestScoreService.scoreList.forEach((scoreItem) => {
      const userItem = new BestScoreItem(
        { tagName: 'li', classes: ['best-score__item'] },
        scoreItem
      );
      this.node.append(userItem.node);
    });
  }
}

export default BestScoreList;
