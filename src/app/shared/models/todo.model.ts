export interface ITodo {
  id: number;
  title: string;
  urgent: boolean;
  description: string;
  completed: boolean;
  createdAt?: Date;
}