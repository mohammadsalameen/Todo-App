import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ITasks } from '../../shared/models/task.model';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TaskFormComponent],
  standalone: true,
  templateUrl: './add-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent {
  constructor(private taskService: TaskService, private router: Router){}
  heading: string = 'Add Task'
  title: string = '';
  description: string = '';
  urgent: boolean = false;
  submitTask(value: ITasks) {
    console.log("submit", value);
      this.taskService.addTask(value);
      this.title = '';
      this.description = '';
      this.urgent = false;
      this.router.navigate(['/admin/dashboard/user-tasks']);
  }

  onClose() {
    this.router.navigate(['/admin/dashboard']);
  }

}
