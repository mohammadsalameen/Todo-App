import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AddTaskComponent } from "../tasks/add-task/add-task.component";
import { EditTaskComponent } from "../tasks/edit-task/edit-task.component";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";
import { UsersListComponent } from "./users-list/users-list.component";


export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'add-task',
    component: AddTaskComponent
  },
  {
    path: 'edit-task',
    component: EditTaskComponent
  },
  {
    path: 'dashboard/user-tasks',
    component: UserTasksComponent
    },
    {
      path: 'users-list',
      component: UsersListComponent
    }
]