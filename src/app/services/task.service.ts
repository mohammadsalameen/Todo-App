import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ITasks, IUser } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private BASE_URL = 'http://localhost:5089/api';
  private STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<ITasks[]>(this.loadTodos());
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadTodos(): ITasks[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTodos(todos: ITasks[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): ITasks[] {
    return this.todosSubject.getValue();
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Tasks`, task );
  }
  updateTask(updatedTask: ITasks){
    const todos = this.getTodos();
    const updatedTodos = todos.map(todo => todo.id === updatedTask.id ? {...updatedTask} : todo);
    this.saveTodos(updatedTodos);
  }
  toggleCompleted(id: string) {
    const todos = this.getTodos().map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos(todos);
  }


  getTasksForUser(userId: string): Observable<ITasks[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/Tasks/${userId}`).pipe(
      map(tasks => tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        completed: t.isCompleted,
        urgent: t.isUrgent,
        assignedUser: t.assignedUser,
        createdAt: t.createdAt,
        comments: t.comments || []
      } as ITasks)))
    );
  }

  getTaskById(id: string): Observable<ITasks | null> {
    return this.http.get<any[]>(`${this.BASE_URL}/Tasks`).pipe(
      map(tasks => {
        const task = tasks.find(t => t.id === id);
        if (task) {
          return {
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.isCompleted,
            urgent: task.isUrgent,
            assignedUser: task.assignedUser,
            createdAt: task.createdAt,
            comments: task.comments || []
          } as ITasks;
        }
        return null;
      })
    );
  }

  getMyTasks(): Observable<ITasks[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/Tasks/my-tasks`).pipe(
      map(tasks => tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        completed: t.isCompleted,
        urgent: t.isUrgent,
        comments: []
      } as ITasks)))
    );
  }

  toggleCompletedAPI(id: string): Observable<any> {
    return this.http.put(`${this.BASE_URL}/Tasks/${id}/toggle`, {});
  }

  deleteTaskById(taskId: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Tasks/delete-task/${taskId}`, taskId);
  }

}
