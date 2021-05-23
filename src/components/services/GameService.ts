import getCardsAPI from '../api/CardsApi';
import { ICard } from '../Card/Card';
import {
  ICardFromJSON,
  ICardsJSON,
} from '../shared/interfaces/card-model-json';
import IndexedDB from './IndexedDB';

export interface IGameService {
  incrementNumberOfComparisons: () => void;
  incrementNumberOfFalseComparisons: () => void;
  settings: IGameSettings;
  categories: string[];
  gameData: Array<ICardsJSON>;
  cards: Array<ICardFromJSON> | [];
  score: number;
  changeSettings: (typeSetting: string, setting: string) => void;
  startGame: () => void;
  stopGame: (finishTime: number) => void;
}

export interface IGameSettings {
  category: string;
  difficulty: string;
}

class GameService {
  settings: any | IGameSettings;

  categories: string[];

  cards: Array<ICardFromJSON> | [];

  sortedCards: Array<ICard> | [];

  score: number;

  gameData: Array<ICardsJSON>;

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
    this.sortedCards = [];
    this.numberOfComparisons = 0;
    this.numberOfFalseComparisons = 0;
  }

  incrementNumberOfComparisons() {
    this.numberOfComparisons++;
  }

  incrementNumberOfFalseComparisons() {
    this.numberOfFalseComparisons++;
  }

  async startGame(): Promise<void> {
    await this.getData();
    await this.setCategoriesToSettings();
    this.setCardsOnCurrentGame(this.settings.category);
  }

  private calculatePoints(finishTime: number): void {
    this.score =
      (this.numberOfComparisons - this.numberOfFalseComparisons) * 100 -
      finishTime * 10;
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

  private setCategoriesToSettings(): void {
    this.categories = this.gameData.map((data) => data.category);
  }

  changeSettings(typeSetting: string, setting: string): void {
    this.settings[typeSetting] = setting; // TODO: найти решение проблемы

    if (typeSetting === 'category') {
      this.setCardsOnCurrentGame(setting);
    }
  }

  private setCardsOnCurrentGame(category: string): void {
    this.gameData.forEach((data: ICardsJSON) => {
      if (data.category === category) {
        this.cards = data.cards;
      }
    });
  }

  private getData = async (): Promise<void> => {
    this.gameData = await getCardsAPI();
  };
}

export default GameService;
