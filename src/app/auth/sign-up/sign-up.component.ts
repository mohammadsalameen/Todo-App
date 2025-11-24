import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  imports: [FormsModule, NgIf],
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  @ViewChild('signUpForm') form: NgForm;
  onSubmit(){
    console.log("form submitted");
    console.log(this.form.value);
  }
}
