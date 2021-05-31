import { IUser } from '../shared/interfaces/api';
import {
  IRegistrationService,
  IRegistrationServiceData,
} from '../shared/interfaces/registration-service-model';
import db from './IndexedDB';

class RegistrationService implements IRegistrationService {
  private dataRegistration: IRegistrationServiceData;

  isAuthorization = false;

  currentUser: IUser | null;

  private isValidation: { [key: string]: boolean | undefined };

  constructor() {
    this.dataRegistration = {
      firstName: '',
      lastName: '',
      email: '',
      userImage: '',
    };
    this.currentUser = null;
    this.isValidation = {};
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.isAuthorization = false;
    this.currentUser = null;
    Object.keys(this.dataRegistration).forEach((prop) => {
      this.dataRegistration[prop] = '';
    });
  }

  getIsValidForm(): boolean {
    return Object.values(this.isValidation).includes(false);
  }

  init(): void {
    if (localStorage.user) {
      this.isAuthorization = true;
      this.currentUser = JSON.parse(localStorage.user);
    }
  }

  changeValue = (
    value: string,
    name: string,
    validationRes?: boolean
  ): void => {
    this.dataRegistration[name] = value;
    this.isValidation[name] = validationRes;
  };

  sendData = async (): Promise<boolean> => {
    if (
      !this.dataRegistration.firstName ||
      !this.dataRegistration.lastName ||
      !this.dataRegistration.email
    ) {
      alert('Заполните все поля');
      return false;
    }

    const user = {
      firstName: this.dataRegistration.firstName,
      lastName: this.dataRegistration.lastName,
      email: this.dataRegistration.email,
      avatar: this.dataRegistration.userImage,
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
    this.isAuthorization = true;

    await db.put('users', user);
    return true;
  };
}

export default RegistrationService;
