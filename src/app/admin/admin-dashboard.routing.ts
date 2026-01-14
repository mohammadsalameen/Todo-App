import { Routes } from "@angular/router";
import { AuthGuard } from "../services/auth-guard.service";

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-task',
    loadComponent: () => import('../tasks/add-task/add-task.component').then(m => m.AddTaskComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-task/:taskId',
    loadComponent: () => import('../tasks/edit-task/edit-task.component').then(m => m.EditTaskComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/user-tasks/:userId',
    loadComponent: () => import('./user-tasks/user-tasks.component').then(m => m.UserTasksComponent),
    canActivate: [AuthGuard]
    },
    {
      path: 'users-list',
      loadComponent: () => import('./users-list/users-list.component').then(m => m.UsersListComponent),
      canActivate: [AuthGuard]
    }
]
