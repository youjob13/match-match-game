export interface IDataRegistrationService {
  firstName: string;
  lastName: string;
  email: string;
  userImage?: string;
}

export interface IRegistrationService {
  isAuthorization: boolean;
  changeValue: (value: string, name: string) => void;
  sendData: () => void;
}
