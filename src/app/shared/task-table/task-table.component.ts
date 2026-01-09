import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgForm } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { fadeIn } from '../animations';
import { filterOptions } from '../../constants';
import { ViewCommentComponent } from '../view-comment/view-comment.component';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule, ViewCommentComponent],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  animations: [fadeIn]
})
export class TaskTableComponent {
  constructor(private taskService: TaskService, private router: Router, private userService: UserService){}
  @Input() role! : string;
  @Input() userId?: string;
  todos: any[] = [];
  allTodos: any[] = [];
  filterOptions = filterOptions;
  selectedOption: number = 10;
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
  pagingManager: any = CREATE_PAGING_MANAGER(this.selectedOption);
  searchText: string = '';
  selectedFilter: string = 'all';
  showCommentModal = false;
  selectedTaskId: string | null = null;

  ngOnInit() {
    if (this.userId) {
      this.taskService.getTasksForUser(this.userId).subscribe((res: any[]) => {
        this.allTodos = res ?? [];
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = this.todos.length;

        const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
        if (this.pagingManager.currentPage > maxPage) {
          this.pagingManager.currentPage = maxPage;
        }
      });
    } else if (this.role === 'user') {
      this.taskService.getMyTasks().subscribe((res: any[]) => {
        this.allTodos = res ?? [];
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = this.todos.length;

        const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
        if (this.pagingManager.currentPage > maxPage) {
          this.pagingManager.currentPage = maxPage;
        }
      });
    } else {
      this.taskService.todos$.subscribe((res: any[]) => {
        this.allTodos = res ?? [];
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = this.todos.length;

        const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
        if (this.pagingManager.currentPage > maxPage) {
          this.pagingManager.currentPage = maxPage;
        }
      });
    }
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

  toggleCompleted(id: string) {
    if (this.role === 'user') {
      this.taskService.toggleCompletedAPI(id).subscribe(() => {
        // Update local list
        this.allTodos = this.allTodos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        this.todos = [...this.allTodos];
      });
    } else {
      this.taskService.toggleCompleted(id);
    }
  }
  addComment(form: NgForm){
    console.log(form);
  }
  updateTask(){
    this.router.navigate(['/admin/edit-task']);
  }
  viewComments(id: string) {
    this.selectedTaskId = id;
    this.showCommentModal = true;
  }

  closeCommentModal() {
    this.showCommentModal = false;
    this.selectedTaskId = null;
  }
  deleteTask(id: string) {
    if (this.role === 'user') {
      this.taskService.deleteTaskAPI(id).subscribe(() => {
        // Remove from local list
        this.allTodos = this.allTodos.filter(t => t.id !== id);
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = this.todos.length;
      });
    } else {
      this.taskService.deleteTask(id);
      this.pagingManager.totalItems = this.todos.length - 1;
    }
  }
}
