import { Routes } from "@angular/router";
import { AuthGuard } from "../../services/auth-guard.service";

export const tasksSummaryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks-summary.component').then(m => m.TasksSummaryComponent),
    canActivate: [AuthGuard]
  }
];
