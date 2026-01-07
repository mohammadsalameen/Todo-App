import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskTableComponent } from "../../shared/task-table/task-table.component";

@Component({
  selector: 'app-user-tasks',
  imports: [TaskTableComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent implements OnInit {
  role: string = 'admin';
  userId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
  }
}
