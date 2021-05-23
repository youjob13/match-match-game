import { IScoreItem } from './indexed-db-data-model';

export interface IBestScoreService {
  getScoreData: () => Promise<void>;
  scoreList: Array<IScoreItem> | [];
}
