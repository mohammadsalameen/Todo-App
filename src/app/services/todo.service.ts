import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<ITodo[]>(this.loadTodos());
  todos$ = this.todosSubject.asObservable();

  constructor() {}

  private loadTodos(): ITodo[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTodos(todos: ITodo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): ITodo[] {
    return this.todosSubject.getValue();
  }

  addTask(task: { title: string; urgent: boolean }) {
    const todos = this.getTodos();
    const newTask: ITodo = {
      id: todos.length + 1,
      title: task.title,
      urgent: task.urgent,
      completed: false,
      createdAt: new Date()
    };
    const updatedTodos = [...todos, newTask];
    this.saveTodos(updatedTodos);
  }

  toggleCompleted(id: number) {
    const todos = this.getTodos().map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos(todos);
  }

  deleteTask(id: number) {
    const todos = this.getTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }

}