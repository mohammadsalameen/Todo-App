import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

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
