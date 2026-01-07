import { Routes } from "@angular/router";

export const tasksSummaryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tasks-summary.component').then(m => m.TasksSummaryComponent),
    // canActivate: [AuthGuard]
  }
];
