import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private BASE_URL = 'http://localhost:5089/api';

  constructor(private http: HttpClient) { }

  getCommentsByTaskId(taskId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.BASE_URL}/Comments/task/${taskId}`);
  }

  deleteComment(taskId: string, commentId: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Comments/delete-comment/${taskId}/${commentId}`, taskId);
  }

  addComment(taskItemId: string, content: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Comments`, { taskItemId, content });
  }
}
