import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from "../../shared/user-table/user-table.component";
import { AuthFormComponent } from "../../shared/auth-form/auth-form.component";
import { fadeIn, slideInUp } from '../../shared/animations';
import { UserService } from '../../services/user.service';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, UserTableComponent, AuthFormComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  animations: [slideInUp, fadeIn]
})
export class UsersListComponent {
  showViewList: boolean = false;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  selectedUser: any = null;

  constructor(private userService: UserService, private toastr: ThirdPartyToastyServiceService) {}

  onAddUser(payload: any) {
    this.userService.createUser(payload.username, payload.email, payload.password, payload.role).subscribe({
      next: (res) => {
        console.log('User created successfully', res);
        this.toastr.toasterSuccess('User Created Successfully', 'Success');
        this.showAddForm = false;
        this.userService.getAllUsers(); // Refresh the list
      },
      error: (err) => {
        console.error('User creation failed', err);
        this.toastr.toasterError(err.error?.message || 'User creation failed. Check console.');
      }
    });
  }

  onEditUserEvent(user: any) {
    this.selectedUser = user;
    this.showEditForm = true;
  }

  onEditUser(payload: any) {
    this.userService.updateUser(this.selectedUser.id, payload.username, payload.email, payload.role).subscribe({
      next: (res) => {
        console.log('User updated successfully', res);
        this.toastr.toasterSuccess('User Updated Successfully', 'Success');
        this.showEditForm = false;
        this.selectedUser = null;
        this.userService.getAllUsers(); // Refresh the list
      },
      error: (err) => {
        console.error('User update failed', err);
        this.toastr.toasterError(err.error?.message || 'User update failed. Check console.');
      }
    });
  }
}
