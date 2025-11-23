import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ITodo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-tasks-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tasks-summary.component.html',
  styleUrl: './tasks-summary.component.css'
})
export class TasksSummaryComponent {

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
