import { Component } from '@angular/core';
import { TaskTableComponent } from '../../shared/task-table/task-table.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [TaskTableComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  role: string = 'user'
}
