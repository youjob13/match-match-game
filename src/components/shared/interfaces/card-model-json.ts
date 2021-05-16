export interface ICardsJSON {
  category: string;
  cards: Array<ICardFromJSON>;
}

export interface ICardFromJSON {
  name: string;
  src: string;
}
