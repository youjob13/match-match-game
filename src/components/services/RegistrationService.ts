import {
  IRegistrationServiceData,
  IRegistrationService,
} from '../shared/interfaces/registration-service-model';
import db from './IndexedDB';

class RegistrationService implements IRegistrationService {
  private dataRegistration: IRegistrationServiceData;

  isAuthorization = false;

  private isValidation: { [key: string]: boolean | undefined };

  constructor() {
    this.dataRegistration = {
      firstName: '',
      lastName: '',
      email: '',
      userImage: '',
    };
    this.isValidation = {};
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.isAuthorization = false;
    Object.keys(this.dataRegistration).forEach((prop) => {
      this.dataRegistration[prop] = '';
    });
  }

  getIsValidForm(): boolean {
    return Object.values(this.isValidation).includes(false);
  }

  init(): void {
    if (localStorage.user) this.isAuthorization = true;
  }

  changeValue = (
    value: string,
    name: string,
    validationRes?: boolean
  ): void => {
    this.dataRegistration[name] = value;
    this.isValidation[name] = validationRes;
  };

  sendData = async (): Promise<void> => {
    if (
      !this.dataRegistration.firstName ||
      !this.dataRegistration.lastName ||
      !this.dataRegistration.email
    ) {
      alert('Заполните все поля');
      return;
    }

    const user = {
      firstName: this.dataRegistration.firstName,
      lastName: this.dataRegistration.lastName,
      email: this.dataRegistration.email,
      avatar: this.dataRegistration.userImage,
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthorization = true;
    await db.put('users', user);
  };
}

export default RegistrationService;
