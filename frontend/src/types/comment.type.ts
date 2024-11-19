export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  user: { username: string };
}
