import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router){}


  handleSubmit(form: any) {
    const {email, password} = form;
    const loggedIn = this.authService.login(email, password);
    if(loggedIn){
      this.router.navigate(['/home']);
    } else{
      alert('Wrong Credentials');
    }
  }
}