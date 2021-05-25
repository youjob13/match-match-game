export interface ICardsDataFromJSON {
  category: string;
  cards: ICardFromJSON[];
}

export interface ICardFromJSON {
  name: string;
  src: string;
}
