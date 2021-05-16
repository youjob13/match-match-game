import './bestScore.scss';

import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import BestScoreList from './BestScoreList/BestScoreList';
import { IUserModel } from '../shared/interfaces/user-model/user-model';

class BestScore extends BaseControl {
  usersData: Array<IUserModel>;

  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.usersData = [];
    this.init();
  }

  private init(): void {
    this.getUsersData();
  }

  async getUsersData(): Promise<void> {
    const response = await fetch('./users.json');
    this.usersData = await response.json();
    this.render();
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
      this.usersData
    );

    wrapper.append(title.node, bestScoreList.node);
  }
}

export default BestScore;
