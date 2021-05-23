import './bestScoreItem.scss';
import userAvatarDefault from '../../../../assets/user_image_default.png';
import BaseControl from '../../../shared/BaseControl/BaseControl';
import { IScoreItem } from '../../../shared/interfaces/indexed-db-data-model';

class BestScoreItem extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private scoreItem: IScoreItem
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private render(): void {
    const userElem = new BaseControl({
      tagName: 'figure',
      classes: ['best-score__item-user'],
    });

    const avatar = new BaseControl({
      tagName: 'img',
      classes: ['best-score__item-avatar'],
      attributes: {
        src: this.scoreItem.user.avatar
          ? this.scoreItem.user.avatar
          : userAvatarDefault,
      },
    });

    const userElemTextContent = new BaseControl({
      tagName: 'figcaption',
      classes: ['best-score__item-text-content'],
    });

    const name = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-name'],
      text: `${this.scoreItem.user.firstName}`,
    });

    const mail = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-mail'],
      text: `${this.scoreItem.user.email}`,
    });

    const points = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-points'],
      text: 'Score: ',
    });

    const score = new BaseControl({
      tagName: 'output',
      classes: ['best-score__item-score'],
      text: `${this.scoreItem.points}`,
    });

    userElemTextContent.node.append(name.node, mail.node);
    userElem.node.append(avatar.node, userElemTextContent.node);
    points.node.append(score.node);
    this.node.append(userElem.node, points.node);
  }
}

export default BestScoreItem;
