import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';
import { ITasks } from '../../shared/models/task.model';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TaskFormComponent],
  standalone: true,
  templateUrl: './add-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent {
  constructor(private taskService: TaskService, private commentService: CommentService, private router: Router){}
  heading: string = 'Add Task';
  title: string = '';
  description: string = '';
  urgent: boolean = false;
  submitTask(value: any) {
    console.log("submit", value);
    this.taskService.addTask(value).subscribe({
      next: (response) => {
        this.title = '';
        this.description = '';
        this.urgent = false;
        if (value.Comment) {
          this.commentService.addComment(response.id, value.Comment).subscribe();
        }
        if (value.AssignedUserId) {
          this.router.navigate(['/admin/dashboard/user-tasks', value.AssignedUserId]);
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        console.error('Error adding task:', err);
        // Optionally show error message
      }
    });
  }

  onClose() {
    this.router.navigate(['/admin/dashboard']);
  }

}
