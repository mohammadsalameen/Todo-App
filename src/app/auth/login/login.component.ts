import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink, NgIf],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router){}


  handleSubmit(form: NgForm) {
    // const {email, password} = form;
    console.log(form);
    // const loggedIn = this.authService.login(email, password);
    // if(loggedIn){
    //   this.router.navigate(['/home']);
    // } else{
    //   alert('Wrong Credentials');
    // }
  }
}
