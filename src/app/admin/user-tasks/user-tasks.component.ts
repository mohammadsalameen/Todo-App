import { Component, Input } from '@angular/core';
import { TaskTableComponent } from "../../shared/task-table/task-table.component";

@Component({
  selector: 'app-user-tasks',
  imports: [TaskTableComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  role: string = 'admin';
}
