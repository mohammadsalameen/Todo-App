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
}
