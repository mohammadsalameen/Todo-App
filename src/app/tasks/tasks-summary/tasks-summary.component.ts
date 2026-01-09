import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITasks } from '../../shared/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tasks-summary.component.html',
  styleUrl: './tasks-summary.component.css'
})
export class TasksSummaryComponent {
  constructor(private taskService: TaskService){}
  todos: ITasks[] = [];

  ngOnInit(): void {
    this.taskService.todos$.subscribe(todos => {
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
