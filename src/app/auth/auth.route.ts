import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'send-code',
    loadComponent: () => import('./send-code/send-code.component').then(m => m.SendCodeComponent),
  },
];
