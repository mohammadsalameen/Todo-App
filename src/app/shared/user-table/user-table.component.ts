import { Component, inject, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CREATE_PAGING_MANAGER, ITEMS_PER_PAGE_OPTIONS } from '../../shared/pagination';
import { Subscription } from 'rxjs';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';


@Component({
  selector: 'app-user-table',
  imports: [CommonModule, NgSelectModule, NgxPaginationModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  router = inject(Router);
  toastr = inject(ThirdPartyToastyServiceService);
  users: any[] = [];
  @Input() show!: boolean;
  @Output() editUserEvent = new EventEmitter<any>();

  selectedOption: number = 10;
  itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS;
  pagingManager: any = CREATE_PAGING_MANAGER(this.selectedOption);
  searchText: string = '';
  private refreshSubscription: Subscription;

  ngOnInit() {
    this.loadUsers();
    this.refreshSubscription = this.userService.refreshSubject.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadUsers() {
    this.userService.getUsersPaged(this.pagingManager.currentPage, this.pagingManager.itemsPerPage, this.searchText).subscribe(res => {
      this.users = res.items;
      this.pagingManager.totalItems = res.totalCount;
    });
  }

  search() {
    this.pagingManager.currentPage = 1;
    this.loadUsers();
  }

  pageChanged($e: any): void {
    this.pagingManager.currentPage = $e;
    this.loadUsers();
  }

  onItemsPerPageChange(): void {
    this.pagingManager.itemsPerPage = this.selectedOption;
    this.pagingManager.currentPage = 1;
    this.loadUsers();
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
          this.loadUsers();
        },
        error: (err) => {
          this.toastr.toasterError(err.error?.message || 'Failed to delete user');
        }
      });
    }
  }
}
