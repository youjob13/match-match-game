import './gameField.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';
import Card, { ICard } from '../../Card/Card';
import WinPopup from '../WinPopup/WinPopup';
import { IGameService } from '../../services/GameService';

const TIME_TO_FLIP = 2;
const COUNTDOWN_TO_STAT_GAME = 15;

class GameField extends BaseControl {
  private cardsOnField: Array<ICard>;

  private openCard: ICard | null;

  private isCompared: boolean;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private gameService: IGameService,
    private readonly stopTimer: () => number,
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.openCard = null;
    this.cardsOnField = [];
    this.isCompared = false;
    this.init();
  }

  private defineDifficulty(): number {
    return +this.gameService.settings.difficulty.match(/\d/).join('');
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

    if (prevCard.cardInfo.name === currentCard.cardInfo.name) {
      currentCard.node.addEventListener('transitionend', (e: any) => {
        // TODO: doing two times
        if (e.propertyName === 'transform') {
          if (prevCard.node.classList.contains('flipped')) {
            prevCard.node.classList.add('matched');
            currentCard.node.classList.add('matched');
            this.gameService.score++;

            this.gameService.cards = this.gameService.cards.filter(
              // TODO: remove from this place
              (card) => card.name !== prevCard.cardInfo.name
            );

            this.isCompared = false;

            if (!this.gameService.cards.length) {
              const finishTime: number = this.stopTimer();
              this.gameService.stopGame();
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
    await this.gameService.startGame();
    await this.sort();
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
      cardElem.node.style.flex = `${100 / this.defineDifficulty()}%`;
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
