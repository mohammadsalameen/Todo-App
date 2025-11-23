import { Routes } from "@angular/router";

export const viewRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth.route').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard.routing').then(m => m.dashboardRoutes)
  },
  {
    path: 'tasks-summary',
    loadChildren: () => import('./tasks-summary.routes').then(m => m.tasksSummaryRoutes)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./add-task.routes').then(m => m.addTasksRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth.route').then(m => m.authRoutes )
  }
];