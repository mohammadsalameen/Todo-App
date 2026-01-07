import { Routes } from "@angular/router";

export const userRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./user-dashboard.component').then(m => m.UserDashboardComponent)
  }
]
