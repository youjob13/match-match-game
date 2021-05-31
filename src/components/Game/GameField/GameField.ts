import './gameField.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';
import Card from '../../Card/Card';
import WinPopup from '../WinPopup/WinPopup';
import { ITimer } from '../../shared/interfaces/timer-model';
import { IGameService } from '../../shared/interfaces/game-service-model';
import { IPropsToBaseControl } from '../../shared/interfaces/api';

const TIME_TO_FLIP = 1.5;
const COUNTDOWN_TO_START_GAME = 30;

class GameField extends BaseControl<HTMLElement> {
  private openCard: HTMLElement | null;

  private isCompared: boolean;

  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private gameService: IGameService,
    private changeCurrentPage: (path: string) => void,
    private timer: ITimer
  ) {
    super(propsToBaseControl);
    this.openCard = null;
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
    ].sort(() => Math.random() - 0.5);
  }

  private compareCards(prevCard: HTMLElement, currentCard: HTMLElement): void {
    this.isCompared = true;
    this.gameService.incrementNumberOfComparisons();

    if (currentCard.isEqualNode(prevCard)) {
      currentCard.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'transform') {
          if (prevCard.classList.contains('flipped')) {
            prevCard.classList.add('matched');
            currentCard.classList.add('matched');

            this.isCompared = false;
            this.gameService.compareCards(prevCard);

            if (!this.gameService.cardsOnField.length) {
              this.timer.stop();
              const finishTime: number = this.timer.getFinishTime();
              this.gameService.stopGame(finishTime);
              const winPopup = new WinPopup(finishTime, this.changeCurrentPage);
            }
          }
        }
      });
    } else {
      currentCard.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'transform') {
          if (
            prevCard.classList.contains('flipped') &&
            !currentCard.classList.contains('matched') &&
            !prevCard.classList.contains('matched')
          ) {
            prevCard.classList.add('no-matched');
            currentCard.classList.add('no-matched');
            this.gameService.incrementNumberOfFalseComparisons();
          }
        }
      });

      setTimeout(() => {
        prevCard.classList.remove('flipped', 'no-matched');
        currentCard.classList.remove('flipped', 'no-matched');
        this.isCompared = false;
      }, TIME_TO_FLIP * 1000);
    }

    this.openCard = null;
  }

  private selectCard = (cardElem: HTMLElement): void => {
    if (this.isCompared) return;

    const selectedCard = cardElem;
    selectedCard.classList.toggle('flipped');

    if (this.openCard) {
      this.compareCards(this.openCard, selectedCard);
    } else {
      this.openCard = cardElem;
    }
  };

  private eventListener(): void {
    this.node.addEventListener('click', (e: Event) => {
      const target = <HTMLElement>e.target;
      const targetElem = <HTMLElement>target.closest('.card');
      if (targetElem) {
        this.selectCard(targetElem);
      }
    });
  }

  private async init(): Promise<void> {
    await this.sort();
    this.timer.startCountdown(COUNTDOWN_TO_START_GAME);
    this.eventListener();
    this.render();
  }

  private render(): void {
    this.node.style.gridTemplateColumns = `repeat(${this.defineDifficulty()}, 1fr)`;

    this.gameService.cards.forEach((card) => {
      const cardElem = new Card(
        { tagName: 'div', classes: ['card', 'flipped'] },
        card,
        this.gameService.settings.category
      );
      this.gameService.cardsOnField.push(cardElem.node);
      this.node.append(cardElem.node);
    });

    setTimeout(() => {
      this.gameService.cardsOnField.forEach((card) =>
        card.classList.remove('flipped')
      );
      this.timer.start();
    }, COUNTDOWN_TO_START_GAME * 1000);
  }
}

export default GameField;
