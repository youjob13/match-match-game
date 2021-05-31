import { IScoreDBItem } from '../shared/interfaces/api';
import { IBestScoreService } from '../shared/interfaces/best-score-service-model';
import db from './IndexedDB';

class BestScoreService implements IBestScoreService {
  scoreList: IScoreDBItem[] = [];

  getScoreData = async (): Promise<void> => {
    this.scoreList = await db.getWithCursor('score', 'points');
  };
}

export default BestScoreService;
