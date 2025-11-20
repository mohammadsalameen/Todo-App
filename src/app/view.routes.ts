import { Routes } from "@angular/router";

export const viewRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth.route').then(m => m.authRoutes)
  },
  {
    path: 'home',
    loadChildren: () => import('./home.routing').then(m => m.homeRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./form.routes').then(m => m.formRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth.route').then(m => m.authRoutes )
  }
];