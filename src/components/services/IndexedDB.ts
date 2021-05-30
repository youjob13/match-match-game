import { IScoreDBItem } from '../shared/interfaces/indexed-db-data-model';

interface IDataBase {
  open: (dbName: string, version?: number) => Promise<void>;
  getWithCursor: (
    storageName: string,
    cursorIndex: string
  ) => Promise<IScoreDBItem[]>;
  add: (storageName: string, data: unknown) => void;
  put: (storageName: string, data: unknown) => Promise<unknown>;
}

class IndexedDB implements IDataBase {
  public db!: IDBDatabase;

  open(dbName: string, version?: number): Promise<void> {
    return new Promise((resolve) => {
      const iDB = window.indexedDB;
      const openRequest = iDB.open(dbName, version);

      openRequest.onupgradeneeded = () => {
        const database = openRequest.result;

        if (!database.objectStoreNames.contains('users')) {
          const store = database.createObjectStore('users', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('email', 'email', { unique: true });
        }

        if (!database.objectStoreNames.contains('score')) {
          const store = database.createObjectStore('score', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('points', 'points');
        }
        this.db = database;
      };

      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve();
      };

      openRequest.onerror = () => {
        throw new Error(`Ошибка: ${openRequest.error}`);
      };
    });
  }

  put(storageName: string, data: unknown): Promise<unknown> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction(storageName, 'readwrite');
      const storeUsers = transaction.objectStore(storageName);
      const request = storeUsers.put(data);

      request.onerror = () => {
        throw new Error('Пользователь с таким email уже зарегистрирован');
      };
      transaction.oncomplete = () => {
        resolve(request.result);
      };
    });
  }

  add(storageName: string, data: unknown): void {
    if (!this.db) return;
    const transaction = this.db.transaction(storageName, 'readwrite');
    const storeScore = transaction.objectStore(storageName);
    const request = storeScore.add(data);

    request.onerror = () => {
      throw new Error(`Ошибка: ${request.error}`);
    };
    transaction.oncomplete = () => {};
  }

  getWithCursor(
    storageName: string,
    cursorIndex: string
  ): Promise<IScoreDBItem[]> {
    return new Promise((resolve) => {
      if (!this.db) return;

      const transaction = this.db.transaction(storageName, 'readonly');
      const storeUsers = transaction.objectStore(storageName);
      const request = storeUsers.index(cursorIndex).openCursor(null, 'prev');
      const resData: IScoreDBItem[] = [];
      let index = 0;

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          if (index < 10) {
            resData.push(cursor.value);
            index++;
          }
          cursor.continue();
        }
      };
      request.onerror = () => {
        throw new Error(`Error: ${request.error}`);
      };
      transaction.oncomplete = () => {
        resolve(resData);
      };
    });
  }
}

const db = new IndexedDB();
export default db;
