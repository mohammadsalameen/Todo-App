import { Component } from '@angular/core';
import { UserTableComponent } from "../../shared/user-table/user-table.component";

@Component({
  selector: 'app-users-list',
  imports: [UserTableComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  showViewList: boolean = false;
}
