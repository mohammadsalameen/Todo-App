export interface ITodo {
  id: number;
  title: string;
  urgent: boolean;
  completed: boolean;
  createdAt?: Date;
}