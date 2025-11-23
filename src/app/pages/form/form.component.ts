import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
addTask: string = 'add-task'
  todoService = inject(TodoService);
  router = inject(Router);
  title: string = '';
  description: string = '';
  urgent: boolean = false;
  submitTask(value: ITodo) {
    console.log("submit", value);
      this.todoService.addTask(value);
      this.title = '';
      this.description = '';
      this.urgent = false;
      // this.router.navigate(['/home']);
  }

}