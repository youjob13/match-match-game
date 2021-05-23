export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface IScoreItem {
  points: number;
  score: number;
  user: IUser;
}
