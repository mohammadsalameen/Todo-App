import { Routes } from "@angular/router";
import { FormComponent } from "./tasks/add-task/add-task.component";
import { AuthGuard } from "./services/auth-guard.service";

export const formRoutes: Routes = [
  {
    path: '',
    component: FormComponent,
    // canActivate: [AuthGuard]
  }
]
