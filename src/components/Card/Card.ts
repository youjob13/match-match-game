import './card.scss';

import { ICardFromJSON } from '../card-model/card-model-json';
import BaseControl from '../BaseControl/BaseControl';

export interface ICard {
  readonly node: HTMLElement;
  card: ICardFromJSON;
  selectCard: (card: ICard) => void;
}

class Card extends BaseControl {
  card: ICardFromJSON;

  selectCard: (card: ICard) => void;

  constructor(
    props: { tagName: string; classes: string[] },
    card: ICardFromJSON,
    selectCard: (card: ICard) => void
  ) {
    super(props);
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
    const image = new BaseControl({ tagName: 'img', classes: ['card__image'] });
    image.node.setAttribute('src', `images/${this.card.src}`); // TODO: change path
    front.node.append(image.node);

    const back = new BaseControl({ tagName: 'div', classes: ['card__back'] });
    this.node.append(cardInner.node);
    cardInner.node.append(front.node, back.node);
  }
}

export default Card;
