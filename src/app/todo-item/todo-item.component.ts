import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @Input() index!: number;
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Output() toggleCompleted = new EventEmitter<number>();
  @Output() deletedTask = new EventEmitter<number>();
}