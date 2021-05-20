// import getCardsAPI from "./CardsApi";

// class IndexedDB {
//   db: any;
//   gameData: any;

//   constructor() {
//     this.db = null;
//     this.gameData = null;
//     this.init();
//   }

//   async getCards(): Promise<void> {
//     this.gameData = await getCardsAPI();
//   }

//   async init() {
//     await this.getCards();
//     await this.openDB();
//   }

//   openDB() {
//     const openRequest = indexedDB.open('youjob13', 1);

//     openRequest.onupgradeneeded = () => {
//       this.db = openRequest.result;

//       if (!this.db.objectStoreNames.contains('gameData')) {
//         this.db.createObjectStore('gameData', { keyPath: 'id' });
//       }
//     };

//     openRequest.onerror = () => {
//       console.error('Error', openRequest.error);
//     };

//     openRequest.onsuccess = () => {
//       this.db = openRequest.result;

//       let transaction = this.db.transaction("gameData", "readwrite");

//       let cards = transaction.objectStore("gameData");

//       let request = cards.add({
//           id: 'gameData',
//           gameData: this.gameData
//       });

//       request.onsuccess = function() {
//         console.log("Книга добавлена в хранилище", request.result);
//       };

//       request.onerror = function() {
//         console.log("Ошибка", request.error);
//       };

//       transaction.oncomplete = function() {
//         console.log("Транзакция выполнена");
//       };
//     };
//   }
// }

// export default IndexedDB;
