import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITaskCounts } from '../../shared/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tasks-summary.component.html',
  styleUrl: './tasks-summary.component.css'
})
export class TasksSummaryComponent implements OnInit {
  constructor(private taskService: TaskService){}

  createdTasksCount: number = 0;
  urgentTasksCount: number = 0;
  completedTasksCount: number = 0;

  ngOnInit(): void {
    this.taskService.getTaskCounts().subscribe(counts => {
      this.createdTasksCount = counts.createdTasks;
      this.urgentTasksCount = counts.urgentTasks;
      this.completedTasksCount = counts.completedTasks;
    });
  }

}
