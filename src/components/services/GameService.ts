import getCardsAPI from '../api/CardsApi';
import {
  ICardFromJSON,
  ICardsDataFromJSON,
} from '../shared/interfaces/card-model-json';
import {
  IGameService,
  IGameSettings,
} from '../shared/interfaces/game-service-model';
import db from './IndexedDB';

class GameService implements IGameService {
  settings: IGameSettings = {
    category: 'animal',
    difficulty: '4 * 4',
  };

  categories: string[] = [];

  cards: ICardFromJSON[] = [];

  private gameData: ICardsDataFromJSON[] = [];

  private score = 0;

  private numberOfComparisons = 0;

  private numberOfFalseComparisons = 0;

  private calculatePoints(finishTime: number): void {
    this.score =
      (this.numberOfComparisons - this.numberOfFalseComparisons) * 100 -
      finishTime * 10;
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
    await this.getData();
    this.setCardsOnCurrentGame(this.settings.category);
  }

  async updateScore(): Promise<void> {
    const currentUser = JSON.parse(localStorage.user);
    db.add('score', { points: this.score, user: currentUser });
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
