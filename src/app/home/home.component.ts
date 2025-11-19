import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  todos: ITodo[] = [];
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
    this.todos = this.todoService.getTodos();
  }

  toggleCompleted(id: number) {
    this.todoService.toggleCompleted(id);
    this.todos = this.todoService.getTodos();
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
    this.todos = this.todoService.getTodos();
  }
}
