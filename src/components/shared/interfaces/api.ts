export interface IBaseControl<U> {
  readonly node: U;
}

export interface IPropsToBaseControl {
  tagName: string;
  classes: string[];
  text?: string;
  attributes?: IAttr;
}

export interface ICardsDataFromJSON {
  category: string;
  cards: ICardFromJSON[];
}

export interface ICardFromJSON {
  name: string;
  src: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface IScoreDBItem {
  points: number;
  user: IUser;
  id: number;
}

export interface ISettings {
  settingName: string;
  options: string[];
  title: string;
}

export interface IGameSettings {
  [key: string]: string;
}

export interface IAttr {
  [key: string]: string | number;
}
