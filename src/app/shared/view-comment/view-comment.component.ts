import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { IComment } from '../models/todo.model';

@Component({
  selector: 'app-view-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.css']
})
export class ViewCommentComponent implements OnInit {
  @Input() taskId!: string;
  @Output() close = new EventEmitter<void>();
  comments: IComment[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.loading = true;
    this.userService.getCommentsByTaskId(this.taskId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading comments', err);
        this.loading = false;
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
