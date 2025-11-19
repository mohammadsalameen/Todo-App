import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: ITodo;
  @Output() toggleCompleted: EventEmitter<number> = new EventEmitter();
  @Output() deletedTask: EventEmitter<number> = new EventEmitter();
}
