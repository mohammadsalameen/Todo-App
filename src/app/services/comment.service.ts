import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../shared/models/task.model';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByTaskId(taskId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${BASE_URL}/Comments/task/${taskId}`);
  }

  deleteComment(taskId: string, commentId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/Comments/delete-comment/${taskId}/${commentId}`, taskId);
  }

  addComment(taskItemId: string, content: string): Observable<any> {
    return this.http.post(`${BASE_URL}/Comments`, { taskItemId, content });
  }
    updateComment(Id: string, content:string): Observable<any>{
      return this.http.post(`${BASE_URL}/Comments/update-comment`, {Id, content})
    }
}
