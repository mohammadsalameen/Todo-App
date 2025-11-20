import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  todoService = inject(TodoService);
  router = inject(Router);
  title: string = '';
  urgent: boolean = false;
  submitTask(value: {title: string, urgent: boolean}) {
    console.log("submit", value);
      this.todoService.addTask(value);
      this.title = '';
      this.urgent = false;
      this.router.navigate(['/home']);
  }
}
