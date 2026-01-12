import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { IUser, ITasks, IComment } from '../shared/models/task.model';

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

  createUser(userName: string, email: string, password: string, role: string): Observable<any> {
    const payload = {userName, email, password, role};
    return this.http.post(`${this.BASE_URL}/Users/create-user`, payload);
  }
}
