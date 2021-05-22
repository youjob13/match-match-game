import getCardsAPI from '../api/CardsApi';
import { ICard } from '../Card/Card';
import {
  ICardFromJSON,
  ICardsJSON,
} from '../shared/interfaces/card-model-json';
// import { ISettings } from '../shared/interfaces/setting-model';

export interface IGameService {
  incrementNumberOfComparisons: () => void;
  incrementNumberOfFalseComparisons: () => void;
  settings: any; // TODO: remove any
  categories: string[];
  gameData: Array<ICardsJSON>;
  cards: Array<ICardFromJSON> | [];
  score: number;
  changeSettings: (typeSetting: string, setting: string) => void;
  startGame: () => void;
  stopGame: (finishTime: number) => void;
}

class GameService {
  settings: any; // TODO: remove any

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

  stopGame(finishTime: number): void {
    this.calculatePoints(finishTime);
    alert(`
    ${this.score},
    ${this.numberOfComparisons},
    ${this.numberOfFalseComparisons},
    ${finishTime}`);
    // getCurrentUserFromIndexedDB
    // add this.score to current user

    const openRequest = indexedDB.open('youjob13', 1);
    let db;

    openRequest.onupgradeneeded = () => {
      db = openRequest.result;

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    };

    openRequest.onerror = () => {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      db = openRequest.result;

      const transaction = db.transaction('users', 'readwrite');

      const cards = transaction.objectStore('users');

      const request = cards.getAll();

      // const request = cards.put({
      //   firstName: this.dataRegistration.firstName,
      //   lastName: this.dataRegistration.lastName,
      //   email: this.dataRegistration.email,
      // });

      request.onsuccess = () => {
        console.log('Список юзеров', request.result);
      };

      request.onerror = () => {
        console.log('Ошибка', request.error);
      };

      transaction.oncomplete = () => {
        console.log('Транзакция выполнена');
      };
    };
  }

  private setCategoriesToSettings(): void {
    this.categories = this.gameData.map((data) => data.category);
  }

  changeSettings(typeSetting: string, setting: string): void {
    this.settings[typeSetting] = setting;

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
