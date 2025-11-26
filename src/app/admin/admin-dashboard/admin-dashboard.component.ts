import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserTableComponent } from "../../shared/user-table/user-table.component";
import { fadeIn, slideInUp } from '../../shared/animations';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ UserTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  animations: [fadeIn, slideInUp]
})
export class AdminDashboardComponent {
  userService = inject(UserService);
  router = inject(Router);
  users = this.userService.getAllUsers(); // from backend or service
  showViewList: boolean = true;


  viewTasks(userId: number) {
    // this.router.navigate(['/admin-dashboard/user-tasks', userId]);
    this.router.navigate(['/admin/user-tasks']);
  }
}
