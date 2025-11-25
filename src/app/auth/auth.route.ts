import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

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
    component: SignupComponent
  },
];
