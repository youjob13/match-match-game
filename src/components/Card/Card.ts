import './card.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import { ICardFromJSON } from '../shared/interfaces/card-model-json';
import { IBaseControl } from '../shared/interfaces/base-control-model';

export interface ICard extends IBaseControl<HTMLElement> {
  cardInfo: ICardFromJSON;
  category: string;
}

class Card extends BaseControl<HTMLElement> implements ICard {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    public cardInfo: ICardFromJSON,
    public category: string
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
    // const image = new BaseControl<HTMLElement>({
    //   tagName: 'img',
    //   classes: ['card__image'],
    //   attributes: { src: `images/${this.category}/${this.cardInfo.src}` },
    // });
    // front.node.append(image.node);

    const back = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['card__back'],
    });

    cardInner.node.append(front.node, back.node);
    this.node.append(cardInner.node);
  }
}

export default Card;
