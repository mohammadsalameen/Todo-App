import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view.routes').then(m => m.viewRoutes),
    title: 'Todo List'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
