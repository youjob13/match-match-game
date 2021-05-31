import './bestScoreItem.scss';
import userAvatarDefault from '../../../../assets/user_image_default.png';
import BaseControl from '../../../shared/BaseControl/BaseControl';
import {
  IPropsToBaseControl,
  IScoreDBItem,
} from '../../../shared/interfaces/api';

class BestScoreItem extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private scoreItem: IScoreDBItem
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private render(): void {
    const userElem = new BaseControl<HTMLElement>({
      tagName: 'figure',
      classes: ['best-score__item-user'],
    });

    const avatar = new BaseControl<HTMLElement>({
      tagName: 'img',
      classes: ['best-score__item-avatar'],
      attributes: {
        src: this.scoreItem.user.avatar
          ? this.scoreItem.user.avatar
          : userAvatarDefault,
      },
    });

    const userElemTextContent = new BaseControl<HTMLElement>({
      tagName: 'figcaption',
      classes: ['best-score__item-text-content'],
    });

    const name = new BaseControl<HTMLElement>({
      tagName: 'p',
      classes: ['best-score__item-name'],
      text: `${this.scoreItem.user.firstName}`,
    });

    const mail = new BaseControl<HTMLElement>({
      tagName: 'p',
      classes: ['best-score__item-mail'],
      text: `${this.scoreItem.user.email}`,
    });

    const points = new BaseControl<HTMLElement>({
      tagName: 'p',
      classes: ['best-score__item-points'],
      text: 'Score: ',
    });

    const score = new BaseControl<HTMLElement>({
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
