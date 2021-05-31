import { ICardFromJSON, IGameSettings } from './api';

export interface IGameService {
  settings: IGameSettings;
  categories: string[];
  cards: ICardFromJSON[] | [];
  cardsOnField: HTMLElement[];
  startGame: () => void;
  stopGame: (finishTime: number) => void;
  incrementNumberOfComparisons: () => void;
  incrementNumberOfFalseComparisons: () => void;
  configureGameSettings: () => void;
  changeSettings: (typeSetting: string, setting: string) => void;
  compareCards: (prevCard: HTMLElement) => void;
}
