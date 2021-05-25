import { IBestScoreService } from '../shared/interfaces/best-score-service-model';
import { IScoreItem } from '../shared/interfaces/indexed-db-data-model';
import IndexedDB from './IndexedDB';

class BestScoreService implements IBestScoreService {
  scoreList: IScoreItem[] | [];

  constructor() {
    this.scoreList = [];
  }

  async getScoreData(): Promise<void> {
    const db = await new IndexedDB('youjob13', 1);
    await db.openReq([['score', { keyPath: 'id', autoIncrement: true }]]);
    await db.getAll('score');

    await setTimeout(() => {
      // TODO: think about & recast to promise
      this.scoreList = db.obtainedData;
    }, 1000);
  }
}

export default BestScoreService;
