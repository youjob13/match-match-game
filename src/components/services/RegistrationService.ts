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
    // TODO: change on switch (trouble with this[prop])
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
  };
}

export default RegistrationService;
