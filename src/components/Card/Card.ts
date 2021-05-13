import './card.scss';

import { ICard } from '../card-model/card-model';
import BaseControl from '../BaseControl/BaseControl';

class Card extends BaseControl {
  card: ICard;

  selectCard: (card: BaseControl) => void;

  constructor(
    props: { tagName: string; classes: string[] },
    card: ICard,
    selectCard: (card: BaseControl) => void
  ) {
    super(props);
    this.card = card;
    this.selectCard = selectCard;
    this.init();
  }

  onCardClick = (): void => {
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
