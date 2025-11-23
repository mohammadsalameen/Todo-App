import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { ITodo } from '../../models/todo.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TaskFormComponent],
  standalone: true,
  templateUrl: './add-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent {
  constructor(private todoService: TodoService, private router: Router){}
  title: string = '';
  description: string = '';
  urgent: boolean = false;
  submitTask(value: ITodo) {
    console.log("submit", value);
      this.todoService.addTask(value);
      this.title = '';
      this.description = '';
      this.urgent = false;
      this.router.navigate(['/admin-dashboard']);
  }

}
