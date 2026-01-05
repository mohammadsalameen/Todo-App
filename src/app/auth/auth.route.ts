import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendCodeComponent } from './send-code/send-code.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'send-code',
    component: SendCodeComponent,
  },
];
