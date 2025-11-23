import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  imports: [FormsModule],
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

}