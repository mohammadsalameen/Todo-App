import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, RouterLink } from '@angular/router';

import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit {
  @Input() titleHeading: string;
  @Input() signUpShow: boolean;
  @Input() showForgetPassword: boolean;
  @Input() handleSubmit: boolean = true;
  @Input() showRole: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() initialUsername: string = '';
  @Input() initialEmail: string = '';
  @Input() initialRole: string = 'User';
  @Output() formSubmitted = new EventEmitter<any>();

  username = '';
  email = '';
  password = '';
  role = "User";
  isLoading = false;

  ngOnInit() {
    this.username = this.initialUsername;
    this.email = this.initialEmail;
    this.role = this.initialRole;
  }

  constructor(private authService: AuthService, private router: Router, private toastr: ThirdPartyToastyServiceService){}
  submit(form: NgForm, signUpShow: boolean) {
    if(form.invalid) return;
    this.isLoading = true;
    const payload = {...form.value, role: form.value.role || 'User'};
    if(signUpShow){
      if(this.handleSubmit){
        this.authService.handleSignUp(payload.username, payload.email, payload.password, payload.role)
        .subscribe({
          next:(res) =>{
            console.log('User registered successfully', res);
            this.toastr.toasterSuccess('Registration successfully!', 'Success');
            form.resetForm();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Registration failed', err);
            this.toastr.toasterError(err.error?.message || 'Registration failed. Check console.')
            this.isLoading = false;
          }
        })
      }else{
        this.formSubmitted.emit(payload);
        this.isLoading = false;
      }
    }else{
      if(this.handleSubmit){
        this.authService.handleSignIn(payload.email, payload.password).subscribe({
          next:(res) =>{
            console.log('User loggedIn successfully', res);
            this.toastr.toasterSuccess('LogIn successfully!');
            localStorage.setItem('token', res.accessToken);
            const role = this.authService.getUserData("role");
            console.log(role);
            if(role == "User"){
              this.router.navigate(['/user/dashboard']);
            }else{
              this.router.navigate(['admin/dashboard']);
            }
            form.resetForm();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('LogIn failed', err);
            this.toastr.toasterError(err.error?.message || 'LogIn failed. Check console.')
            this.isLoading = false;
          }
        })
      }else{
        // For signin, not used in this context
        this.isLoading = false;
      }
    }
  }
}
