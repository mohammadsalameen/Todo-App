import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  constructor(private todoService: TodoService, private router: Router){}
  todos: any[] = [];

  selectedOption: number = 10;
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
  pagingManager: any = CREATE_PAGING_MANAGER(this.selectedOption);
  searchText: string = '';

  ngOnInit() {
    this.todoService.todos$.subscribe((res: any[]) => {
      this.todos = res ?? [];
      this.pagingManager.totalItems = this.todos.length;

      const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
      if (this.pagingManager.currentPage > maxPage) {
        this.pagingManager.currentPage = maxPage;
      }
    });
  }

  search() {
    const params = {
      Page: this.pagingManager.currentPage,
      PageSize: this.pagingManager.itemsPerPage,
      StrSearch: this.searchText?.trim() || ''
    };

    this.getFilteredTodos(params).subscribe(res => {
      // res = { data: [...], total: number }

      this.todos = res.data;
      this.pagingManager.totalItems = res.total;

      const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
      if (this.pagingManager.currentPage > maxPage) {
        this.pagingManager.currentPage = maxPage;
      }
    });
  }


  pageChanged($e: any): void {
    this.pagingManager.currentPage = $e;
  }

  onItemsPerPageChange(): void {
    this.pagingManager.itemsPerPage = this.selectedOption;
    this.pagingManager.currentPage = 1;
  }

  getFilteredTodos(params: any){
    const{Page, PageSize, StrSearch} = params;

    let filtered = this.todos.filter(t => t.title.toLowerCase().include(StrSearch.toLowerCase()));
    const total = filtered.length;
    const start = (Page - 1) * PageSize;
    const end = start + PageSize;
    const Paginated = filtered.slice(start, end);

    return of({
      data:Paginated,
      total: total
    })

  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  toggleCompleted(id: number) {
    this.todoService.toggleCompleted(id);
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
    this.pagingManager.totalItems = this.todos.length - 1;
  }
  updateTask(){
    this.router.navigate(['/dashboard/edit-task']);
  }
}
