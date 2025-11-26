import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../services/auth-service.service';
import { navLinks } from '../constants';
import { NgFor } from '@angular/common';
import { fadeIn } from '../shared/animations';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations:[fadeIn]
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router){}
  links = navLinks;
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
