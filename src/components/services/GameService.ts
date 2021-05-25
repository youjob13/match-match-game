import getCardsAPI from '../api/CardsApi';
import {
  ICardFromJSON,
  ICardsDataFromJSON,
} from '../shared/interfaces/card-model-json';
import {
  IGameService,
  IGameSettings,
} from '../shared/interfaces/game-service-model';
import IndexedDB from './IndexedDB';

class GameService implements IGameService {
  settings: IGameSettings;

  categories: string[];

  cards: ICardFromJSON[] | [];

  private gameData: ICardsDataFromJSON[];

  private score: number;

  private numberOfComparisons: number;

  private numberOfFalseComparisons: number;

  constructor() {
    this.settings = {
      category: 'animal',
      difficulty: '4 * 4',
    };
    this.score = 0;
    this.gameData = [];
    this.categories = [];
    this.cards = [];
    this.numberOfComparisons = 0;
    this.numberOfFalseComparisons = 0;
  }

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
    await this.setCategoriesToSettings();
  }

  async startGame(): Promise<void> {
    await this.getData();
    this.setCardsOnCurrentGame(this.settings.category);
  }

  async updateScore(): Promise<void> {
    const currentUser = JSON.parse(localStorage.user);
    const db = await new IndexedDB('youjob13', 1);
    await db.openReq([['score', { keyPath: 'id', autoIncrement: true }]]);
    await db.add(
      'score',
      { points: this.score, user: currentUser },
      'readwrite'
    );
  }

  async stopGame(finishTime: number): Promise<void> {
    await this.calculatePoints(finishTime);

    alert(`
    ${this.score},
    ${this.numberOfComparisons},
    ${this.numberOfFalseComparisons},
    ${finishTime}`);

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
