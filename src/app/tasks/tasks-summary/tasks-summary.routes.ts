import { Routes } from "@angular/router";
import { TasksSummaryComponent } from "./tasks-summary.component";

export const tasksSummaryRoutes: Routes = [
  {
    path: '',
    component: TasksSummaryComponent,
    // canActivate: [AuthGuard]
  }
];
