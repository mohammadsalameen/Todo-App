import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent {
  userService = inject(UserService);
  router = inject(Router);
  users = this.userService.getAllUsers(); // from backend or service
  @Input() show!: boolean;

  viewTasks(userId: number) {
    // this.router.navigate(['/admin-dashboard/user-tasks', userId]);
    this.router.navigate(['/admin-dashboard/user-tasks']);
  }
}
