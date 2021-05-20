import getCardsAPI from '../api/CardsApi';
import { ICard } from '../Card/Card';
import {
  ICardFromJSON,
  ICardsJSON,
} from '../shared/interfaces/card-model-json';
// import { ISettings } from '../shared/interfaces/setting-model';

export interface IGameService {
  settings: any; // TODO: remove any
  categories: string[];
  gameData: Array<ICardsJSON>;
  cards: Array<ICardFromJSON> | [];
  score: number;
  changeSettings: (typeSetting: string, setting: string) => void;
  startGame: () => void;
  stopGame: () => void;
}

class GameService {
  settings: any; // TODO: remove any

  categories: string[];

  cards: Array<ICardFromJSON> | [];

  sortedCards: Array<ICard> | [];

  score: number;

  gameData: Array<ICardsJSON>;

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
  }

  async startGame(): Promise<void> {
    await this.getData();
    await this.setCategoriesToSettings();
    this.setCardsOnCurrentGame(this.settings.category);
  }

  stopGame(): void {
    alert(this.score);
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
