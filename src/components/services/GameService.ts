import getCardsAPI from '../api/CardsApi';
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
  getData: () => void;
  startGame: () => void;
  changeSettings: (typeSetting: string, setting: string) => void;
}

class GameService {
  settings: any; // TODO: remove any

  categories: string[];

  cards: Array<ICardFromJSON> | [];

  gameData: Array<ICardsJSON>;

  constructor() {
    this.settings = {
      category: 'animal',
      difficulty: '4 * 4',
    };
    this.gameData = [];
    this.categories = this.gameData.map((data) => data.category);
    this.cards = [];
  }

  private setCategory(): void {
    this.categories = this.gameData.map((data) => data.category);
  }

  private setCards(): void {
    this.cards = this.gameData[0].cards;
  }

  changeSettings(typeSetting: string, setting: string): void {
    this.settings[typeSetting] = setting;
  }

  async startGame(): Promise<void> {
    this.getData();
  }

  getData = async (): Promise<void> => {
    this.gameData = await getCardsAPI();
    this.setCategory();
    this.setCards();
  };
}

export default GameService;
