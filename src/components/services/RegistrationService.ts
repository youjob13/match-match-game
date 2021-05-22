import {
  IDataRegistrationService,
  IRegistrationService,
} from '../shared/interfaces/registration-service-model';

class RegistrationService implements IRegistrationService {
  private dataRegistration: IDataRegistrationService;

  isAuthorization: boolean;

  constructor() {
    this.dataRegistration = {
      firstName: '',
      lastName: '',
      email: '',
      userImage: undefined,
    };
    this.isAuthorization = false;
  }

  changeValue = (value: string, name: string): void => {
    // TODO: (trouble with this[prop])
    // this.dataRegistration[name] = value;
    if (name === 'firstName') {
      this.dataRegistration.firstName = value;
    } else if (name === 'lastName') {
      this.dataRegistration.lastName = value;
    } else if (name === 'email') {
      this.dataRegistration.email = value;
    } else if (name === 'userImage') {
      this.dataRegistration.userImage = value;
    }
  };

  sendData = (): void => {
    alert(
      `firstName: ${this.dataRegistration.firstName}
      lastName: ${this.dataRegistration.lastName}
      email: ${this.dataRegistration.email}`
    );

    this.isAuthorization = true;

    const openRequest = indexedDB.open('youjob13', 1);
    let db;

    openRequest.onupgradeneeded = () => {
      db = openRequest.result;

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    };

    openRequest.onerror = () => {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      db = openRequest.result;

      const transaction = db.transaction('users', 'readwrite');

      const cards = transaction.objectStore('users');

      const request = cards.put({
        firstName: this.dataRegistration.firstName,
        lastName: this.dataRegistration.lastName,
        email: this.dataRegistration.email,
        score: 0,
      });

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
  };
}

export default RegistrationService;
