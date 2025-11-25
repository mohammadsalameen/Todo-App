import { Routes } from "@angular/router";

export const viewRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.route').then(m => m.authRoutes)
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
    loadChildren: () => import('./tasks-summary.routes').then(m => m.tasksSummaryRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then(m => m.authRoutes )
  }
];
