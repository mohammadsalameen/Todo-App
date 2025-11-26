import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgForm } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TaskTableComponent {
  constructor(private todoService: TodoService, private router: Router){}
  @Input() role! : string;
  todos: any[] = [];
  allTodos: any[] = [];

  selectedOption: number = 10;
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
  pagingManager: any = CREATE_PAGING_MANAGER(this.selectedOption);
  searchText: string = '';
  filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Urgent', value: 'urgent' }
  ];
  selectedFilter: string = 'all';

  ngOnInit() {
    this.todoService.todos$.subscribe((res: any[]) => {
      this.allTodos = res ?? [];
      this.todos = [...this.allTodos];
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

      this.todos = res.filtered;
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

  onFilterChange(): void {
    this.pagingManager.currentPage = 1;
    this.search();
  }

  getFilteredTodos(params: any){
    const{StrSearch} = params;

    let filtered = this.allTodos.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(StrSearch.toLowerCase());
      let matchesFilter = true;
      if (this.selectedFilter === 'completed') {
        matchesFilter = t.completed;
      } else if (this.selectedFilter === 'urgent') {
        matchesFilter = t.urgent;
      }
      return matchesSearch && matchesFilter;
    });
    const total = filtered.length;

    return of({
      filtered: filtered,
      total: total
    })

  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  toggleCompleted(id: number) {
    this.todoService.toggleCompleted(id);
  }
  addComment(form: NgForm){
    console.log(form);
  }
  updateTask(){
    this.router.navigate(['/admin/edit-task']);
  }
  deleteTask(id: number) {
    this.todoService.deleteTask(id);
    this.pagingManager.totalItems = this.todos.length - 1;
  }
}
