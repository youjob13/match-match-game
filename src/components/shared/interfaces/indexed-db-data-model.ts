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
