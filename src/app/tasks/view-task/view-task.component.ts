import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { ITodo } from '../../shared/models/todo.model';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: ITodo | null = null;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getTaskById(id).subscribe(task => {
      this.task = task;
    });
  }
}
