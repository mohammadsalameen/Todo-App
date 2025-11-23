import { Routes } from "@angular/router";
import { AddTaskComponent } from "./tasks/add-task/add-task.component";
import { AuthGuard } from "./services/auth-guard.service";

export const addTasksRoutes: Routes = [
  {
    path: '',
    component: AddTaskComponent,
    // canActivate: [AuthGuard]
  }
]
