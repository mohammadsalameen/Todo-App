import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
