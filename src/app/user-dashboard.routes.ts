import { Routes } from "@angular/router";
import { UserDashboardComponent } from "./user/user-dashboard/user-dashboard.component";

export const userRoutes: Routes = [
  {
    path: '',
    component: UserDashboardComponent
  }
]