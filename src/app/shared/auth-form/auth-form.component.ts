import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

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

  username = '';
  email = '';
  password = '';
  role = "User";

  constructor(private authService: AuthService){}

  submit(form: NgForm) {
    if(form.invalid) return;
    const payload = {...form.value, role: 'User'};
    this.authService.register(payload.username, payload.email, payload.password, payload.role)
    .subscribe({
      next:(res) =>{
        console.log('User registered successfully', res);
        alert('Registration successfully!');
        form.resetForm();
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert(err.error?.message || 'Registration failed. Check console.')
      }
    })
  }
}
