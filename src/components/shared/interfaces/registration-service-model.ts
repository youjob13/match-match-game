import { IUser } from './api';

export interface IRegistrationServiceData {
  [key: string]: string;
}

export interface IRegistrationService {
  currentUser: IUser | null;
  isAuthorization: boolean;
  logOut: () => void;
  init: () => void;
  sendData: () => Promise<boolean>;
  getIsValidForm: () => boolean;
  changeValue: (value: string, name: string, validationRes?: boolean) => void;
}
