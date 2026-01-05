import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

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

  constructor(private authService: AuthService, private router: Router, private toastr: ThirdPartyToastyServiceService){}
  submit(form: NgForm, signUpShow: boolean) {
    if(form.invalid) return;
    const payload = {...form.value, role: 'User'};
    if(signUpShow){
      this.authService.handleSignUp(payload.username, payload.email, payload.password, payload.role)
      .subscribe({
        next:(res) =>{
          console.log('User registered successfully', res);
          this.toastr.toasterSuccess('Registration successfully!', 'Success');
          form.resetForm();
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.toastr.toasterError(err.error?.message || 'Registration failed. Check console.')
        }
      })
    }else{
      this.authService.handleSignIn(payload.email, payload.password).subscribe({
        next:(res) =>{
          console.log('User loggedIn successfully', res);
          this.toastr.toasterSuccess('LogIn successfully!');
          localStorage.setItem('token', res.accessToken);
          const role = this.authService.getUserRole();
          console.log(role);
          if(role == "User"){
            this.router.navigate(['/user/dashboard']);
          }else{
            this.router.navigate(['admin/dashboard']);
          }
          form.resetForm();
        },
        error: (err) => {
          console.error('LogIn failed', err);
          this.toastr.toasterError(err.error?.message || 'LogIn failed. Check console.')
        }
      })
    }
  }
}
