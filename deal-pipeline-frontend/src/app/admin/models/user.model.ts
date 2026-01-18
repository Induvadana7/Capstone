export interface User {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  active: boolean;
  createdAt?: string;
}
