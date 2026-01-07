export interface ITodo {
  id: number;
  title: string;
  urgent: boolean;
  description: string;
  completed: boolean;
  assignedUser?: number;
  createdAt?: Date;
  comments: string;
}
