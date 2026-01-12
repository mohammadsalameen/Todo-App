import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { of } from 'rxjs';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';


@Component({
  selector: 'app-user-table',
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  toastr = inject(ThirdPartyToastyServiceService);
  allUsers: any[] = [];
  users: any[] = [];
  @Input() show!: boolean;
  @Output() editUserEvent = new EventEmitter<any>();

  selectedOption: number = 10;
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
  pagingManager: any = CREATE_PAGING_MANAGER(this.selectedOption);
  searchText: string = '';

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      this.users = [...this.allUsers];
      this.pagingManager.totalItems = this.users.length;

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

    this.getFilteredUsers(params).subscribe(res => {
      this.users = res.data;
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

  getFilteredUsers(params: any) {
    const { Page, PageSize, StrSearch } = params;

    let filtered = this.allUsers.filter(u => u.userName.toLowerCase().includes(StrSearch.toLowerCase()));
    const total = filtered.length;
    const start = (Page - 1) * PageSize;
    const end = start + PageSize;
    const paginated = filtered.slice(start, end);

    return of({
      data: paginated,
      total: total
    });
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  viewTasks(userId: string) {
    this.router.navigate(['/admin/dashboard/user-tasks', userId]);
  }

  editUser(user: any) {
    this.editUserEvent.emit(user);
  }

  async deleteUser(userId: string) {
    const confirmed = await this.toastr.confirmDelete();
    if (confirmed) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.toastr.toasterSuccess('User deleted successfully', 'Success');
          this.refreshUsers();
        },
        error: (err) => {
          this.toastr.toasterError(err.error?.message || 'Failed to delete user');
        }
      });
    }
  }

  private refreshUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      this.users = [...this.allUsers];
      this.pagingManager.totalItems = this.users.length;

      const maxPage = Math.ceil(this.pagingManager.totalItems / this.pagingManager.itemsPerPage) || 1;
      if (this.pagingManager.currentPage > maxPage) {
        this.pagingManager.currentPage = maxPage;
      }
    });
  }
}
