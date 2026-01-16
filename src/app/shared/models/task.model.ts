export interface IComment {
  id: string;
  content: string;
  taskTitle: string;
  createdBy: string;
  updatedBy: string;
}

export interface ITasks {
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
  tasks: ITasks[];
  role?:string;
}

export interface ITaskCounts {
  createdTasks: number;
  urgentTasks: number;
  completedTasks: number;
}
