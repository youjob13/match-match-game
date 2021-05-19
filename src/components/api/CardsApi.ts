import { ICardsJSON } from '../shared/interfaces/card-model-json';

async function getCardsAPI(): Promise<Array<ICardsJSON>> {
  const res = await fetch('./cards.json');
  const cards: Array<ICardsJSON> = await res.json();
  return cards;
}

export default getCardsAPI;
