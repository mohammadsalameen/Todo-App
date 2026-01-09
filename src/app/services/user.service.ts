import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { IUser, ITodo, IComment } from '../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:5089/api';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    this.http.get<IUser[]>(`${this.BASE_URL}/Users`).subscribe(users => {
      const usersWithEmptyTasks = users.map(user => ({ ...user, tasks: [] }));
      this.usersSubject.next(usersWithEmptyTasks);
    });
    return this.users$;
  }

  getTasksForUser(userId: string): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${this.BASE_URL}/Tasks/${userId}`).pipe(
      map(tasks => {
        const currentUsers = this.usersSubject.value;
        const userIndex = currentUsers.findIndex(u => u.userId === userId);
        if (userIndex !== -1) {
          currentUsers[userIndex] = { ...currentUsers[userIndex], tasks };
          this.usersSubject.next([...currentUsers]);
        }
        return tasks;
      })
    );
  }

  getTaskById(id: string): Observable<ITodo | null> {
    return this.users$.pipe(
      map(users => users.flatMap(u => u.tasks).find(t => t.id === id) || null)
    );
  }

  getCommentsByTaskId(taskId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.BASE_URL}/Comments/task/${taskId}`);
  }
}
