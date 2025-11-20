import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./services/auth-guard.service";

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
]