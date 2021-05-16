import './bestScoreList.scss';
import { IUserModel } from '../../shared/interfaces/user-model';
import BaseControl from '../../shared/BaseControl/BaseControl';
import BestScoreItem from './BestScoreItem/BestScoreItem';

class BestScoreList extends BaseControl {
  users: Array<IUserModel>;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    usersData: Array<IUserModel>
  ) {
    super(propsToBaseControl);
    this.users = usersData;
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    this.users.forEach((user) => {
      const userItem = new BestScoreItem(
        { tagName: 'li', classes: ['best-score__item'] },
        user
      );
      this.node.append(userItem.node);
    });
  }
}

export default BestScoreList;
