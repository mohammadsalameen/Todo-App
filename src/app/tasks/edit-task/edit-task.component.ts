import { Component, ViewEncapsulation } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-edit-task',
  imports: [TaskFormComponent, FormsModule],
  templateUrl: './edit-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditTaskComponent {
  title: string = '';
  urgent: string = '';
  description: string = '';
  constructor(private todoService: TodoService) {}

  updateTodo(values: any){}
}