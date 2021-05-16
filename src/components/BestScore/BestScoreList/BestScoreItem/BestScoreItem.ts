import { IUserModel } from '../../../shared/interfaces/user-model/user-model';
import './bestScoreItem.scss';

import BaseControl from '../../../shared/BaseControl/BaseControl';

class BestScoreItem extends BaseControl {
  user: IUserModel;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    user: IUserModel
  ) {
    super(propsToBaseControl);
    this.user = user;
    this.init();
  }

  private init(): void {
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
      attributes: { src: this.user.avatar },
    });

    const userElemTextContent = new BaseControl({
      tagName: 'figcaption',
      classes: ['best-score__item-text-content'],
    });
    const name = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-name'],
      text: `${this.user.name}`,
    });
    const mail = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-mail'],
      text: `${this.user.mail}`,
    });

    const points = new BaseControl({
      tagName: 'p',
      classes: ['best-score__item-points'],
      text: 'Score: ',
    });
    const score = new BaseControl({
      tagName: 'output',
      classes: ['best-score__item-score'],
      text: `${this.user.score}`,
    });

    userElemTextContent.node.append(name.node, mail.node);
    points.node.append(score.node);
    userElem.node.append(avatar.node, userElemTextContent.node);
    this.node.append(userElem.node, points.node);
  }
}

export default BestScoreItem;
