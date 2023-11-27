import { Scripts } from './Scripts';

export interface User {
  id: number;
  email: string;
  created_at: string;
  scripts: Scripts;
}
