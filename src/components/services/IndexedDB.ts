import { IScoreItem } from '../shared/interfaces/indexed-db-data-model';

interface IParamsReq {
  keyPath?: string;
  autoIncrement?: boolean;
}

type IOpenReq = [
  string,
  IParamsReq
]; /* storageName: string, objectStoreSettings: {keyPath?: string, autoIncrement?: boolean} */

class IndexedDB {
  private db: IDBDatabase | null;

  private openRequest: IDBOpenDBRequest;

  public gettingData: Array<IScoreItem> | [];

  constructor(private dbName: string, private versionReq: number) {
    this.openRequest = indexedDB.open(this.dbName, this.versionReq);
    this.db = null;
    this.gettingData = [];
  }

  openReq(params: Array<IOpenReq>): void {
    this.openRequest.onupgradeneeded = () => {
      this.db = this.openRequest.result;

      params.forEach((storage) => {
        if (!this.db?.objectStoreNames.contains(storage[0])) {
          this.db?.createObjectStore(storage[0], storage[1]);
        }
      });
    };
  }

  put(storageName: string, data: unknown, mode: IDBTransactionMode): void {
    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;

      const transaction = this.db.transaction(storageName, mode);

      const users = transaction.objectStore(storageName);

      const request = users.put(data);

      request.onsuccess = () => {
        console.log('Регистрация успешна', request.result);
      };

      request.onerror = () => {
        console.log('Ошибка', request.error);
      };

      transaction.oncomplete = () => {
        console.log('Транзакция выполнена');
      };
    };

    this.openRequest.onerror = () => {
      console.error('Error', this.openRequest.error);
    };
  }

  add(storageName: string, data: unknown, mode?: IDBTransactionMode): void {
    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;

      const transaction = this.db.transaction(storageName, mode || 'readonly');

      const users = transaction.objectStore(storageName);

      const request = users.add(data);

      request.onsuccess = () => {
        console.log('Регистрация успешна', request.result);
      };

      request.onerror = () => {
        console.log('Ошибка', request.error);
      };

      transaction.oncomplete = () => {
        console.log('Транзакция выполнена');
      };
    };

    this.openRequest.onerror = () => {
      console.error('Error', this.openRequest.error);
    };
  }

  getAll(storageName: string, params?: IDBKeyRange | number): void {
    this.openRequest.onsuccess = () => {
      this.db = this.openRequest.result;
      const transaction = this.db.transaction(storageName, 'readonly');

      const users = transaction.objectStore(storageName);

      const request = users.getAll();

      request.onsuccess = () => {
        console.log('Регистрация успешна', request.result);
      };

      request.onerror = () => {
        console.log('Ошибка', request.error);
      };

      transaction.oncomplete = () => {
        this.gettingData = request.result;
        this.gettingData.length = 10; // TODO: переделать
        console.log('Транзакция выполнена');
      };
    };

    this.openRequest.onerror = () => {
      console.error('Error', this.openRequest.error);
    };
  }
}

export default IndexedDB;
