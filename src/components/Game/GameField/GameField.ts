import './gameField.scss';

import {
  ICardsJSON,
  ICardFromJSON,
} from '../../shared/interfaces/card-model-json';
import BaseControl from '../../shared/BaseControl/BaseControl';
import Card, { ICard } from '../../Card/Card';
import WinPopup from '../WinPopup/WinPopup';

const TIME_TO_FLIP = 2;
const COUNTDOWN_TO_STAT_GAME = 15;

class GameField extends BaseControl {
  private cards: Array<ICardFromJSON>;

  private gameCards: Array<ICard>;

  private openCard: ICard | null;

  private isCompared: boolean;

  // private category: string;

  private stopGame: () => number;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    stopGame: () => number,
    private gameSettings: any,
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.cards = [];
    // this.category = 'animal';
    this.openCard = null;
    this.gameCards = [];
    this.stopGame = stopGame;
    this.isCompared = false;
  }

  private defineDifficulty(): number {
    return +this.gameSettings.difficulty.match(/\d/).join('');
  }

  private sort() {
    this.cards.sort(() => Math.random() - 0.5).length =
      this.defineDifficulty() ** 2 / 2;
    this.cards = [...this.cards, ...this.cards].sort(() => Math.random() - 0.5); // TODO: think about sort method
    this.render();
  }

  private compareCards(prevCard: ICard, currentCard: ICard): void {
    this.isCompared = true;

    if (prevCard.card.name === currentCard.card.name) {
      currentCard.node.addEventListener('transitionend', (e: any) => {
        // TODO: doing two times
        if (e.propertyName === 'transform') {
          if (prevCard.node.classList.contains('flipped')) {
            prevCard.node.classList.add('matched');
            currentCard.node.classList.add('matched');
            this.gameCards = this.gameCards.filter(
              (card) => card.card.name !== prevCard.card.name
            );
            this.isCompared = false;
            if (!this.gameCards.length) {
              const finishTime: number = this.stopGame();
              const winPopup = new WinPopup(finishTime, this.changeCurrentPage);
            }
          }
        }
      });
    } else {
      currentCard.node.addEventListener('transitionend', () => {
        if (
          prevCard.node.classList.contains('flipped') &&
          !currentCard.node.classList.contains('matched') &&
          !prevCard.node.classList.contains('matched')
        ) {
          prevCard.node.classList.add('no-matched');
          currentCard.node.classList.add('no-matched');
        }
      });

      setTimeout(() => {
        // TODO: read about Promise
        prevCard.node.classList.remove('flipped', 'no-matched');
        currentCard.node.classList.remove('flipped', 'no-matched');
        this.isCompared = false;
      }, TIME_TO_FLIP * 1000);
    }

    this.openCard = null;
  }

  protected selectCard = (card: ICard): void => {
    if (this.isCompared) return;

    const currentCard = card;
    currentCard.node.classList.toggle('flipped');

    if (this.openCard) {
      this.compareCards(this.openCard, currentCard);
    } else {
      this.openCard = card;
    }
  };

  setCards(gameData: ICardsJSON): void {
    this.cards = gameData.cards;
    this.sort();
  }

  private render(): void {
    console.log(this.gameSettings);
    this.cards.forEach((card) => {
      const cardElem = new Card(
        { tagName: 'div', classes: ['card', 'flipped'] },
        card,
        this.selectCard,
        this.gameSettings.category
      );
      cardElem.node.style.flex = `${100 / this.defineDifficulty()}%`;
      this.gameCards.push(cardElem);
      this.node.append(cardElem.node);
    });

    setTimeout(
      () =>
        this.gameCards.forEach((card) => card.node.classList.remove('flipped')),
      COUNTDOWN_TO_STAT_GAME * 1000
    );
  }
}

export default GameField;
