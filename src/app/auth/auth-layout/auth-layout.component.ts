import { Component } from '@angular/core';
import { fadeIn } from '../../shared/animations';
import { AuthFormComponent } from "../../shared/auth-form/auth-form.component";
import { NgForm } from '@angular/forms';

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
  signInTitle: string = 'Sign In'

  toggle(signUp: boolean) {
    this.isSignUpActive = signUp;
  }

  signUpForm(form: NgForm){
    console.log(form);
  }

  signInForm(form: NgForm){
    console.log(form);
  }
}