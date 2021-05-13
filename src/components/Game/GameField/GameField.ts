import './gameField.scss';

import { ICard } from '../../card-model/card-model';
import BaseControl from '../../BaseControl/BaseControl';
import Card from '../../Card/Card';

class GameField extends BaseControl {
  private cards: Array<ICard>;

  private openCard: ICard | null;

  private isCompared: boolean;

  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.cards = [];
    this.openCard = null;
    this.isCompared = false;
    // this.init();
  }

  private sort() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
    this.render(); // TODO: change location
  }

  private compareCards(prevCard: any, currentCard: any): void {
    this.isCompared = true;
    if (prevCard.card.name === currentCard.card.name) {
      prevCard.node.classList.add('matched');
      currentCard.node.classList.add('matched');
      this.isCompared = false;
    }
    setTimeout(() => {
      prevCard.node.classList.remove('flipped');
      currentCard.node.classList.remove('flipped');
    }, 2000);
    setTimeout(() => {
      // TODO: change
      this.isCompared = false;
      this.openCard = null;
    }, 2500);
  }

  protected selectCard = (card: any): void => {
    if (this.isCompared) return;

    const currentCard = card;
    currentCard.node.classList.toggle('flipped');

    if (this.openCard) {
      this.compareCards(this.openCard, currentCard);
    } else {
      this.openCard = card;
    }
  };

  setCards(cards: Array<ICard>): void {
    this.cards = cards;
    this.cards = [...this.cards, ...this.cards];
    this.sort();
  }

  // private init(): void {}

  private render(): void {
    this.cards.forEach((card) => {
      const cardElem = new Card(
        { tagName: 'div', classes: ['card'] },
        card,
        this.selectCard
      );
      this.node.append(cardElem.node);
    });
  }
}

export default GameField;
