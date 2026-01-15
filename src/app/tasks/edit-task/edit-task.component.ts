import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommentService } from '../../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';


@Component({
  selector: 'app-edit-task',
  imports: [TaskFormComponent, FormsModule],
  templateUrl: './edit-task.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditTaskComponent implements OnInit {
  heading: string = 'Update Task';
  taskId: string = '';
  defaultValues: any = {
    urgent: false
  };

  constructor(
    private taskService: TaskService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ThirdPartyToastyServiceService
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId') || '';
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        if (task) {
          this.defaultValues = {
            title: task.title,
            description: task.description,
            urgent: task.urgent,
            assignedUser: task.assignedUser
          };
        }
      });
    }
  }

  updateTodo(values: any) {
    this.taskService.updateTask(this.taskId, values).subscribe({
      next: () => {
        if (values.Comment) {
          this.commentService.addComment(this.taskId, values.Comment).subscribe();
        }
        this.toastr.toasterSuccess('Task updated successfully', 'Success');
        this.location.back();
      },
      error: (err) => {
        this.toastr.toasterError(err.error?.message || 'Failed to update task');
      }
    });
  }

  onClose() {
    this.location.back();
  }
}
