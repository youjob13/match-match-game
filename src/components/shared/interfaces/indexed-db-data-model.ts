interface IParamsReq {
  keyPath?: string;
  autoIncrement?: boolean;
}

export type IOpenReq = [
  string,
  IParamsReq
]; /* storageName: string, objectStoreSettings: {keyPath?: string, autoIncrement?: boolean} */

export interface IIndexedDB {
  obtainedData: IScoreItem[] | [];
  openReq: (params: IOpenReq[]) => void;
  put: (storageName: string, data: unknown, mode: IDBTransactionMode) => void;
  add: (storageName: string, data: unknown, mode: IDBTransactionMode) => void;
  getAll: (storageName: string, params?: IDBKeyRange | number) => void;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface IScoreItem {
  points: number;
  score: number;
  user: IUser;
}
