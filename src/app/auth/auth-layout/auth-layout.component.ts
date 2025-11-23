import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  standalone: true,
  imports: [LoginComponent, SignupComponent]
})
export class AuthLayoutComponent {
  isSignUpActive = false;

  toggle(signUp: boolean) {
    this.isSignUpActive = signUp;
  }
}
