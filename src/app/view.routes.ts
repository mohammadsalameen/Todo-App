import { Routes } from "@angular/router";

export const viewRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'view-task/:id',
    loadComponent: () => import('./tasks/view-task/view-task.component').then(m => m.ViewTaskComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-dashboard.routing').then(m => m.adminRoutes)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user-dashboard/user-dashboard.routes').then(m => m.userRoutes)
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
