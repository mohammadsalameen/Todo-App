import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITasks } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private STORAGE_KEY = 'todos';
  private todosSubject = new BehaviorSubject<ITasks[]>(this.loadTodos());
  todos$ = this.todosSubject.asObservable();

  constructor() {}

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

  addTask(task: ITasks) {
    const todos = this.getTodos();
    const newTask: ITasks = {
      ...task,
      id: (todos.length + 1).toString(),
      completed: false,
      createdAt: new Date(),
      comments: []
    };
    const updatedTodos = [...todos, newTask];
    this.saveTodos(updatedTodos);
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

  deleteTask(id: string) {
    const todos = this.getTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }

}
