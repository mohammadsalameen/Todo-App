import { Routes } from "@angular/router";
import { UserDashboardComponent } from "./user-dashboard.component";

export const userRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent
  }
]