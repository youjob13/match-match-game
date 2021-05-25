import { ICardFromJSON } from './card-model-json';

export interface IGameSettings {
  [key: string]: string;
}

export interface IGameService {
  settings: IGameSettings;
  categories: string[];
  cards: ICardFromJSON[] | [];
  startGame: () => void;
  stopGame: (finishTime: number) => void;
  incrementNumberOfComparisons: () => void;
  incrementNumberOfFalseComparisons: () => void;
  configureGameSettings: () => void;
  changeSettings: (typeSetting: string, setting: string) => void;
}
