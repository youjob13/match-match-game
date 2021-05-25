import { ICardsDataFromJSON } from '../shared/interfaces/card-model-json';

async function getCardsAPI(): Promise<ICardsDataFromJSON[]> {
  const res = await fetch('./cards.json');
  const cards: ICardsDataFromJSON[] = await res.json();
  return cards;
}

export default getCardsAPI;
