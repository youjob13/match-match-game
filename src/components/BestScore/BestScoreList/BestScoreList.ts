import { IBestScoreService } from '../../shared/interfaces/best-score-service-model';
import './bestScoreList.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';
import BestScoreItem from './BestScoreItem/BestScoreItem';
import { IScoreItem } from '../../shared/interfaces/indexed-db-data-model';

class BestScoreList extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private bestScoreService: IBestScoreService
  ) {
    super(propsToBaseControl);
    this.init();
  }

  private async init(): Promise<void> {
    await this.render();
  }

  private render(): void {
    setTimeout(() => {
      this.bestScoreService.scoreList
        .sort((a, b) => b.points - a.points)
        .forEach((scoreItem: IScoreItem) => {
          const userItem = new BestScoreItem(
            { tagName: 'li', classes: ['best-score__item'] },
            scoreItem
          );
          this.node.append(userItem.node);
        });
    }, 2000);
  }
}

export default BestScoreList;
