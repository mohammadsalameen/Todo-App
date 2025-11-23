import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  todos: ITodo[] = [];
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    })
  }
  get createdTasksCount(): number {
    return this.todos.length;
  }

  get urgentTasksCount(): number {
    return this.todos.filter(task => task.urgent).length;
  }

  get completedTasksCount(): number {
    return this.todos.filter(task => task.completed).length;
  }

}
