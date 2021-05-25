export interface IRegistrationServiceData {
  [key: string]: string;
}

export interface IRegistrationService {
  logOut: () => void;
  isAuthorization: boolean;
  changeValue: (value: string, name: string) => void;
  sendData: () => void;
}
