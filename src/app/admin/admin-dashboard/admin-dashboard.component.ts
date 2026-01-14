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
  users: any[] = [];
  showViewList: boolean = true;

  ngOnInit() {
    // Data is now loaded in user-table component
    
  }

  viewTasks(userId: string) {
    this.router.navigate(['/admin/dashboard/user-tasks', userId]);
  }
}
