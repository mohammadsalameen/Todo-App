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
  @Input() signUpShow: boolean;
  @Input() showForgetPassword: boolean;
  @Output() formSubmitted = new EventEmitter<any>();

  username = '';
  email = '';
  password = '';
  role = "User";

  constructor(private authService: AuthService){}

  submit(form: NgForm, signUpShow: boolean) {
    if(form.invalid) return;
    const payload = {...form.value, role: 'User'};
    if(signUpShow){
      this.authService.handleSignUp(payload.username, payload.email, payload.password, payload.role)
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
    }else{
      this.authService.handleSignIn(payload.email, payload.password).subscribe({
        next:(res) =>{
          console.log('User loggedIn successfully', res);
          alert('LogIn successfully!');
          form.resetForm();
        },
        error: (err) => {
          console.error('LogIn failed', err);
          alert(err.error?.message || 'LogIn failed. Check console.')
        }
      })
    }
  }
}
