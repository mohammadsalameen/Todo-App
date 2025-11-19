import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todoService = inject(TodoService);
  todos$ = this.todoService.todos$;

  toggleCompleted(id: number) {
    this.todoService.toggleCompleted(id);
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
  }
}