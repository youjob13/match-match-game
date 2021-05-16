import './card.scss';
import { ICardFromJSON } from '../shared/interfaces/card-model/card-model-json';
import BaseControl from '../shared/BaseControl/BaseControl';

export interface ICard {
  readonly node: HTMLElement;
  card: ICardFromJSON;
  selectCard: (card: ICard) => void;
}

class Card extends BaseControl {
  card: ICardFromJSON;

  selectCard: (card: ICard) => void;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    card: ICardFromJSON,
    selectCard: (card: ICard) => void
  ) {
    super(propsToBaseControl);
    this.card = card;
    this.selectCard = selectCard;
    this.init();
  }

  private onCardClick = (): void => {
    this.selectCard(this);
  };

  private init(): void {
    this.render();
    this.eventListeners();
  }

  private eventListeners(): void {
    this.node.addEventListener('click', this.onCardClick);
  }

  private render(): void {
    const cardInner = new BaseControl({
      tagName: 'div',
      classes: ['card__inner'],
    });
    // console.log(this.card);

    const front = new BaseControl({ tagName: 'div', classes: ['card__front'] });
    const image = new BaseControl({
      tagName: 'img',
      classes: ['card__image'],
      attributes: { src: `images/${this.card.src}` },
    });
    front.node.append(image.node);

    const back = new BaseControl({ tagName: 'div', classes: ['card__back'] });

    cardInner.node.append(front.node, back.node);
    this.node.append(cardInner.node);
  }
}

export default Card;
