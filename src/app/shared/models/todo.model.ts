export interface ITodo {
  id: string;
  title: string;
  urgent: boolean;
  description: string;
  completed: boolean;
  assignedUser?: string;
  createdAt?: Date;
  comments: string[];
}

export interface IUser {
  userId: string;
  userName: string;
  email?: string;
  tasks: ITodo[];
}
