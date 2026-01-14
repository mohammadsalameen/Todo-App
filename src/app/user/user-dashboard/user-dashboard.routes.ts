import { Routes } from "@angular/router";
import { AuthGuard } from "../../services/auth-guard.service";

export const userRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./user-dashboard.component').then(m => m.UserDashboardComponent),
    canActivate: [AuthGuard]
  }
]
