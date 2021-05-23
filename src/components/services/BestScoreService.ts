import { IScoreItem } from '../shared/interfaces/indexed-db-data-model';
import IndexedDB from './IndexedDB';

class BestScoreService {
  scoreList: Array<IScoreItem> | [];

  constructor() {
    this.scoreList = [];
  }

  async getScoreData(): Promise<void> {
    const db = await new IndexedDB('youjob13', 1);
    await db.openReq([['score', { keyPath: 'id', autoIncrement: true }]]);
    await db.getAll('score');
    await setTimeout(() => {
      this.scoreList = db.gettingData;
    }, 1000);
  }
}

export default BestScoreService;
