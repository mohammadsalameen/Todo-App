import { Component, ViewEncapsulation } from '@angular/core';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-task',
  imports: [TaskFormComponent, FormsModule],
  templateUrl: './edit-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditTaskComponent {
  heading: string = 'Update Task'
  title: string = '';
  urgent: string = '';
  description: string = '';
  constructor(private taskService: TaskService, private router: Router) {}

  updateTodo(values: any){}

  onClose() {
    this.router.navigate(['/admin/dashboard']);
  }
}
