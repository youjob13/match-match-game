import './card.scss';
import { ICardFromJSON } from '../shared/interfaces/card-model-json';
import BaseControl from '../shared/BaseControl/BaseControl';

export interface ICard {
  readonly node: HTMLElement;
  card: ICardFromJSON;
  category: any;
  selectCard: (card: ICard) => void;
}

class Card extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    public card: ICardFromJSON,
    public selectCard: (card: ICard) => void,
    public category: any
  ) {
    super(propsToBaseControl);
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
    console.log(this.category);

    const front = new BaseControl({ tagName: 'div', classes: ['card__front'] });
    const image = new BaseControl({
      tagName: 'img',
      classes: ['card__image'],
      attributes: { src: `images/${this.category}/${this.card.src}` },
    });
    front.node.append(image.node);

    const back = new BaseControl({ tagName: 'div', classes: ['card__back'] });

    cardInner.node.append(front.node, back.node);
    this.node.append(cardInner.node);
  }
}

export default Card;
