import { Routes } from "@angular/router";
import { TasksSummaryComponent } from "./tasks/tasks-summary/tasks-summary.component";
import { AuthGuard } from "./services/auth-guard.service";

export const tasksSummaryRoutes: Routes = [
  {
    path: '',
    component: TasksSummaryComponent,
    // canActivate: [AuthGuard]
  }
];
