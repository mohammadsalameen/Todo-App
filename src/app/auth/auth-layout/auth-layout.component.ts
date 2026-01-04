import { Component } from '@angular/core';
import { fadeIn } from '../../shared/animations';
import { AuthFormComponent } from "../../shared/auth-form/auth-form.component";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  standalone: true,
  imports: [AuthFormComponent],
  animations: [fadeIn]
})
export class AuthLayoutComponent {
  isSignUpActive = false;
  signUpTitle: string = 'Sign Up';
  signInTitle: string = 'Sign In';

  constructor() {}

  toggle(signUp: boolean) {
    this.isSignUpActive = signUp;
  }
}
