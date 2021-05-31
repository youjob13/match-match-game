import { IScoreDBItem } from './api';

export interface IBestScoreService {
  getScoreData: () => Promise<void>;
  scoreList: IScoreDBItem[];
}
