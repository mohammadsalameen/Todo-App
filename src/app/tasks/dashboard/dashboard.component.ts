import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../shared/models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todos-list/todo-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
