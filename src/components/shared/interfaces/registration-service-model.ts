export interface IDataRegistrationService {
  firstName: string;
  lastName: string;
  email: string;
  userImage?: string;
}

export interface IRegistrationService {
  isAuthorization: any;
  changeValue: (value: string, name: string) => void;
  sendData: () => void;
}
