import {
  IDataRegistrationService,
  IRegistrationService,
} from '../shared/interfaces/registration-service-model';
import IndexedDB from './IndexedDB';

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

  logOut(): void {
    localStorage.removeItem('user');
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

  sendData = async (): Promise<void> => {
    const user = {
      firstName: this.dataRegistration.firstName,
      lastName: this.dataRegistration.lastName,
      email: this.dataRegistration.email,
      avatar: null,
    };
    localStorage.setItem('user', JSON.stringify(user));

    this.isAuthorization = true;

    const db = await new IndexedDB('youjob13', 1);
    await db.openReq([['users', { keyPath: 'id', autoIncrement: true }]]);
    await db.put('users', user, 'readwrite');
  };
}

export default RegistrationService;
