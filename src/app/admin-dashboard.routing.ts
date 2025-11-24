import { Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";
import { EditTaskComponent } from "./tasks/edit-task/edit-task.component";
import { AdminDashboardComponent } from "./admin/admin-dashboard/admin-dashboard.component";
import { UserTasksComponent } from "./admin/user-tasks/user-tasks.component";
import { AddTaskComponent } from "./tasks/add-task/add-task.component";

export const adminRoutes: Routes = [
  {
    path: '',
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
    path: 'user-tasks',
    component: UserTasksComponent
    }
]
