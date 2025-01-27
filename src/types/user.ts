import { ROLE } from '../utils/enums';

export interface User {
  id: number;
  name?: string;
  surname?: string;
  nickName?: string;
  email: string;
  password: string;
  age?: number;
  role: ROLE;
}
export type UserAdd = Omit<User, 'id'>;
