import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const viewRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-dashboard.routing').then(m => m.adminRoutes)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user-dashboard.routes').then(m => m.userRoutes)
  },
  {
    path: 'tasks-summary',
    loadChildren: () => import('./tasks/tasks-summary/tasks-summary.routes').then(m => m.tasksSummaryRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then(m => m.authRoutes )
  }
];