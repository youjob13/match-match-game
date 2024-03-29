import getCardsAPI from '../api/CardsApi';
import {
  ICardFromJSON,
  ICardsDataFromJSON,
  IGameSettings,
} from '../shared/interfaces/api';
import { IGameService } from '../shared/interfaces/game-service-model';
import db from './IndexedDB';

class GameService implements IGameService {
  settings: IGameSettings = {
    category: 'animal',
    difficulty: '4 * 4',
  };

  categories: string[] = [];

  cards: ICardFromJSON[] = [];

  cardsOnField: HTMLElement[] = [];

  timerToFlipCardsId: number | null = null;

  private gameData: ICardsDataFromJSON[] = [];

  private score = 0;

  private numberOfComparisons = 0;

  private numberOfFalseComparisons = 0;

  compareCards(prevCard: HTMLElement): void {
    this.cardsOnField = this.cardsOnField.filter(
      (card) => !card.isEqualNode(prevCard)
    );
  }

  private resetValues(): void {
    this.numberOfComparisons = 0;
    this.numberOfFalseComparisons = 0;
  }

  private calculatePoints(finishTime: number): void {
    const points =
      (this.numberOfComparisons - this.numberOfFalseComparisons) * 100 -
      finishTime * 10;
    this.score = points > 0 ? points : 0;

    this.resetValues();
  }

  private setCategoriesToSettings(): void {
    this.categories = this.gameData.map((data) => data.category);
  }

  private setCardsOnCurrentGame(category: string): void {
    this.gameData.forEach((data) => {
      if (data.category === category) {
        this.cards = data.cards;
      }
    });
  }

  private getData = async (): Promise<void> => {
    this.gameData = await getCardsAPI();
  };

  async configureGameSettings(): Promise<void> {
    await this.getData();
    this.setCategoriesToSettings();
  }

  async startGame(): Promise<void> {
    window.clearTimeout(this.timerToFlipCardsId || undefined);
    this.cardsOnField = [];
    await this.getData();
    this.setCardsOnCurrentGame(this.settings.category);
  }

  async updateScore(): Promise<void> {
    if (localStorage.user) {
      const currentUser = JSON.parse(localStorage.user);
      db.add('score', { points: this.score, user: currentUser });
    }
  }

  stopGame(finishTime: number): void {
    this.calculatePoints(finishTime);
    this.updateScore();
  }

  incrementNumberOfComparisons(): void {
    this.numberOfComparisons++;
  }

  incrementNumberOfFalseComparisons(): void {
    this.numberOfFalseComparisons++;
  }

  changeSettings(typeSetting: string, setting: string): void {
    this.settings[typeSetting] = setting;

    if (typeSetting === 'category') {
      this.setCardsOnCurrentGame(setting);
    }
  }
}

export default GameService;
