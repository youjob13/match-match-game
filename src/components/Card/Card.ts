import './card.scss';
import { ICardFromJSON } from '../shared/interfaces/card-model-json';
import BaseControl from '../shared/BaseControl/BaseControl';

export interface ICard {
  readonly node: HTMLElement;
  cardInfo: ICardFromJSON;
  category: string;
  selectCard: (cardInfo: ICard) => void;
}

class Card extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    public cardInfo: ICardFromJSON,
    public selectCard: (card: ICard) => void,
    public category: string
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('click', this.onCardClick);
    this.render();
  }

  private onCardClick = (): void => {
    this.selectCard(this);
  };

  private render(): void {
    const cardInner = new BaseControl({
      tagName: 'div',
      classes: ['card__inner'],
    });

    const front = new BaseControl({ tagName: 'div', classes: ['card__front'] });
    const image = new BaseControl({
      tagName: 'img',
      classes: ['card__image'],
      attributes: { src: `images/${this.category}/${this.cardInfo.src}` },
    });
    front.node.append(image.node);

    const back = new BaseControl({ tagName: 'div', classes: ['card__back'] });

    cardInner.node.append(front.node, back.node);
    this.node.append(cardInner.node);
  }
}

export default Card;
