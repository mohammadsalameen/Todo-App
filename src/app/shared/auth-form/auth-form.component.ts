import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Input() titleHeading: string;
  @Input() showUserName: boolean;
  @Input() showForgetPassword: boolean;
  @Output() formSubmitted = new EventEmitter<any>();

  submit(form: NgForm) {
    this.formSubmitted.emit(form.value);
  }
}
