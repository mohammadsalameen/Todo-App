import { Routes } from "@angular/router";
import { DashboardComponent } from "./tasks/dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard.service";
import { EditTaskComponent } from "./tasks/edit-task/edit-task.component";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-task',
    component: EditTaskComponent
  }
]
