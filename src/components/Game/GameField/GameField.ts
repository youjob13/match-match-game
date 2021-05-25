import './gameField.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';
import Card, { ICard } from '../../Card/Card';
import WinPopup from '../WinPopup/WinPopup';
import { ITimer } from '../../shared/interfaces/timer-model';
import { IGameService } from '../../shared/interfaces/game-service-model';

const TIME_TO_FLIP = 2;
const COUNTDOWN_TO_STAT_GAME = 15;

class GameField extends BaseControl<HTMLElement> {
  private cardsOnField: ICard[];

  private openCard: ICard | null;

  private isCompared: boolean;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private gameService: IGameService,
    private changeCurrentPage: (path: string) => void,
    private timer: ITimer
  ) {
    super(propsToBaseControl);
    this.openCard = null;
    this.cardsOnField = [];
    this.isCompared = false;
    this.init();
  }

  private defineDifficulty(): number {
    return +this.gameService.settings.difficulty
      .split('')
      .splice(0, 1)
      .join('');
  }

  private sort(): void {
    this.gameService.cards.sort(() => Math.random() - 0.5).length =
      this.defineDifficulty() ** 2 / 2;
    this.gameService.cards = [
      ...this.gameService.cards,
      ...this.gameService.cards,
    ].sort(() => Math.random() - 0.5); // TODO: think about sort method
  }

  private compareCards(prevCard: ICard, currentCard: ICard): void {
    this.isCompared = true;
    this.gameService.incrementNumberOfComparisons();

    if (prevCard.cardInfo.name === currentCard.cardInfo.name) {
      currentCard.node.addEventListener(
        'transitionend',
        (e: TransitionEvent) => {
          if (e.propertyName === 'transform') {
            if (prevCard.node.classList.contains('flipped')) {
              prevCard.node.classList.add('matched');
              currentCard.node.classList.add('matched');

              this.gameService.cards = this.gameService.cards.filter(
                (card) => card.name !== prevCard.cardInfo.name
              );

              this.isCompared = false;

              if (!this.gameService.cards.length) {
                this.timer.stop();
                const finishTime: number = this.timer.getFinishTime();
                this.gameService.stopGame(finishTime);
                const winPopup = new WinPopup(
                  finishTime,
                  this.changeCurrentPage
                );
              }
            }
          }
        }
      );
    } else {
      currentCard.node.addEventListener(
        'transitionend',
        (e: TransitionEvent) => {
          if (e.propertyName === 'transform') {
            if (
              prevCard.node.classList.contains('flipped') &&
              !currentCard.node.classList.contains('matched') &&
              !prevCard.node.classList.contains('matched')
            ) {
              prevCard.node.classList.add('no-matched');
              currentCard.node.classList.add('no-matched');
              this.gameService.incrementNumberOfFalseComparisons();
            }
          }
        }
      );

      setTimeout(() => {
        prevCard.node.classList.remove('flipped', 'no-matched');
        currentCard.node.classList.remove('flipped', 'no-matched');
        this.isCompared = false;
      }, TIME_TO_FLIP * 1000);
    }

    this.openCard = null;
  }

  protected selectCard = (cardElem: ICard): void => {
    if (this.isCompared) return;

    const selectedCard = cardElem;
    selectedCard.node.classList.toggle('flipped');

    if (this.openCard) {
      this.compareCards(this.openCard, selectedCard);
    } else {
      this.openCard = cardElem;
    }
  };

  private async init(): Promise<void> {
    await this.sort();
    this.timer.start();
    this.render();
  }

  private render(): void {
    this.gameService.cards.forEach((card) => {
      const cardElem = new Card(
        { tagName: 'div', classes: ['card', 'flipped'] },
        card,
        this.selectCard,
        this.gameService.settings.category
      );
      const gap = 1;
      const cardWidth = 100 / this.defineDifficulty() - gap;
      cardElem.node.style.flex = `${cardWidth}%`;
      cardElem.node.style.maxWidth = `${cardWidth}%`;
      this.cardsOnField.push(cardElem);
      this.node.append(cardElem.node);
    });

    setTimeout(
      () =>
        this.cardsOnField.forEach((card) =>
          card.node.classList.remove('flipped')
        ),
      COUNTDOWN_TO_STAT_GAME * 1000
    );
  }
}

export default GameField;
