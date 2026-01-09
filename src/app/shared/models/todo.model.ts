export interface IComment {
  id: string;
  content: string;
  taskTitle: string;
}

export interface ITodo {
  id: string;
  title: string;
  urgent: boolean;
  description: string;
  completed: boolean;
  assignedUser?: string;
  createdAt?: Date;
  comments: IComment[];
}

export interface IUser {
  userId: string;
  userName: string;
  email?: string;
  tasks: ITodo[];
}
