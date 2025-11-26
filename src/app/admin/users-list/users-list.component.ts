import { Component } from '@angular/core';
import { UserTableComponent } from "../../shared/user-table/user-table.component";
import { fadeIn, slideInUp } from '../../shared/animations';

@Component({
  selector: 'app-users-list',
  imports: [UserTableComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
  animations: [slideInUp, fadeIn]
})
export class UsersListComponent {
  showViewList: boolean = false;
}
