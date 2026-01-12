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
  isLoading: boolean = false;

  constructor(private userService: UserService, private toastr: ThirdPartyToastyServiceService) {}

  onAddUser(payload: any) {
    this.isLoading = true;
    this.userService.createUser(payload.username, payload.email, payload.password, payload.role).subscribe({
      next: (res) => {
        console.log('User created successfully', res);
        this.toastr.toasterSuccess('User Created Successfully', 'Success');
        this.showAddForm = false;
        this.isLoading = false;
        this.userService.getAllUsers(); // Refresh the list
      },
      error: (err) => {
        console.error('User creation failed', err);
        this.toastr.toasterError(err.error?.message || 'User creation failed. Check console.');
      }
    });
  }
}
