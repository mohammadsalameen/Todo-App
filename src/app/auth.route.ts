import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
  },
  {
    path: 'signin',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
