import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser, ITodo } from '../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:5089/api';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    this.http.get<IUser[]>(`${this.BASE_URL}/Users/users-tasks`).subscribe(users => {
      this.usersSubject.next(users);
    });
    return this.users$;
  }

  getTasksForUser(userId: string): Observable<ITodo[]> {
    return this.users$.pipe(
      map(users => users.find(u => u.userId === userId)?.tasks || [])
    );
  }

  getTaskById(id: string): Observable<ITodo | null> {
    return this.users$.pipe(
      map(users => users.flatMap(u => u.tasks).find(t => t.id === id) || null)
    );
  }
}
