import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth-service.service';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';
import { IComment } from '../models/task.model';

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
  isAdmin = false;

  constructor(private commentService: CommentService, private authService: AuthService, private toastService: ThirdPartyToastyServiceService) {}

  ngOnInit() {
    this.isAdmin = this.authService.getUserData('role') === 'Admin';
    this.loadComments();
  }

  loadComments() {
    this.loading = true;
    this.commentService.getCommentsByTaskId(this.taskId).subscribe({
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

  async deleteComment(comment: IComment) {
    const confirmed = await this.toastService.confirmDelete('Delete Comment', 'Are you sure you want to delete this comment?');
    if (confirmed) {
      this.commentService.deleteComment(this.taskId, comment.id).subscribe({
        next: () => {
          this.toastService.toasterSuccess('Comment deleted successfully');
          this.loadComments(); // Reload comments
        },
        error: (err) => {
          console.error('Error deleting comment', err);
          this.toastService.toasterError('Failed to delete comment');
        }
      });
    }
  }
}
