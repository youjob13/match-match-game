import './card.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import { ICardFromJSON, IPropsToBaseControl } from '../shared/interfaces/api';

class Card extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private cardInfo: ICardFromJSON,
    private category: string
  ) {
    super(propsToBaseControl);
    this.render();
  }

  private render(): void {
    const cardInner = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['card__inner'],
    });

    const front = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['card__front'],
    });
    front.node.style.backgroundImage = `url(images/${this.category}/${this.cardInfo.src})`;

    const back = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['card__back'],
    });

    cardInner.node.append(front.node, back.node);
    this.node.append(cardInner.node);
  }
}

export default Card;
