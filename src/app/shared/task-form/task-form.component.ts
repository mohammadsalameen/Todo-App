import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../services/user.service';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, NgIf, NgSelectModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Input() defaultValues: any = null;
  @Output() submitTask: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  users: any[] = [];
  selectedUser: any = null;
  selectedAssignedUser: string | null = null;

  constructor(private userService: UserService, private toastrService: ThirdPartyToastyServiceService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onUserChange(event: any) {
    this.selectedUser = event;
  }

  submit(formData: any){
    const transformedData: any = {
      Title: formData.title,
      Description: formData.description,
      Comment: formData.comment,
      IsUrgent: formData.urgent,
      CreatedAt: new Date().toISOString()
    };
    if (!this.selectedAssignedUser) {
      this.toastrService.toasterWarning('Please select a user');
      return;
    }
    if (this.selectedAssignedUser) {
      transformedData.AssignedUserId = this.selectedAssignedUser;
      transformedData.AssignedUserName = this.selectedUser?.userName || '';
    }
    this.submitTask.emit(transformedData);
  }
}
