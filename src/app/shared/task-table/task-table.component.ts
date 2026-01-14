import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, NgForm } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { Router } from '@angular/router';
import { fadeIn } from '../animations';
import { filterOptions } from '../../constants';
import { ViewCommentComponent } from '../view-comment/view-comment.component';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule, ViewCommentComponent],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  animations: [fadeIn]
})
export class TaskTableComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router, private userService: UserService, private toastr: ThirdPartyToastyServiceService){}
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
    this.loadTasks();
  }

  loadTasks() {
    if (this.userId) {
      this.taskService.getTasksPaged(this.userId, this.pagingManager.currentPage, this.pagingManager.itemsPerPage, this.searchText || undefined).subscribe(res => {
        this.allTodos = res.items ?? [];
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = res.totalCount;
        this.applyFilters();
        })
    } else if (this.role === 'user') {
      this.taskService.getMyTasksPaged(this.pagingManager.currentPage, this.pagingManager.itemsPerPage, this.searchText || undefined).subscribe(res => {
        this.allTodos = res.items ?? [];
        this.todos = [...this.allTodos];
        this.pagingManager.totalItems = res.totalCount;
        this.applyFilters();

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
        this.applyFilters();
      });
    }
  }

  search() {
    this.pagingManager.currentPage = 1;
    this.loadTasks();
  }

  pageChanged($e: any): void {
    this.pagingManager.currentPage = $e;
    this.loadTasks();
  }

  onItemsPerPageChange(): void {
    this.pagingManager.itemsPerPage = this.selectedOption;
    this.pagingManager.currentPage = 1;
    this.loadTasks();
  }

  onFilterChange(): void {
    this.pagingManager.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.allTodos.filter(t => {
      let matchesFilter = true;
      if (this.selectedFilter === 'completed') {
        matchesFilter = t.completed;
      } else if (this.selectedFilter === 'urgent') {
        matchesFilter = t.urgent;
      }
      return matchesFilter;
    });
    this.todos = filtered;
  }



  trackById(index: number, item: any): any {
    return item.id;
  }

  toggleCompleted(id: string) {
    const task = this.allTodos.find(t => t.id === id);
    if (task) {
      const newCompleted = !task.completed;
      this.taskService.changeStatus(id, newCompleted).subscribe(() => {
        // Update local list
        this.allTodos = this.allTodos.map(t => t.id === id ? { ...t, completed: newCompleted } : t);
        this.todos = [...this.allTodos];
      });
    }
  }

  updateTask(taskId: string){
    this.router.navigate(['/admin/edit-task', taskId]);
  }
  viewComments(id: string) {
    this.selectedTaskId = id;
    this.showCommentModal = true;
  }

  closeCommentModal() {
    this.showCommentModal = false;
    this.selectedTaskId = null;
  }
  async deleteTask(id: string) {
    const confirmed = await this.toastr.confirmDelete();
    if (confirmed) {
      this.taskService.deleteTaskById(id).subscribe({
        next: () => {
          this.toastr.toasterSuccess('Task deleted successfully', 'Success');
          // Remove from local list
          this.allTodos = this.allTodos.filter(t => t.id !== id);
          this.todos = [...this.allTodos];
          this.pagingManager.totalItems = this.todos.length;
        },
        error: (err) => {
          this.toastr.toasterError(err.error?.message || 'Failed to delete task');
        }
      });
    }
  }
}
