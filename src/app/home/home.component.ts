import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeIn, slideInUp } from '../shared/animations';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeIn, slideInUp]
})
export class HomeComponent implements OnInit {
  buttonRoute: string = '/auth';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserData('role');
      if (role === 'Admin') {
        this.buttonRoute = '/admin/dashboard';
      } else if (role === 'User') {
        this.buttonRoute = '/user/dashboard';
      }
    }
  }
}
