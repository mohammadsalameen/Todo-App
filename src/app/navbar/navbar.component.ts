import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../services/auth-service.service';
import { navLinks } from '../constants';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { fadeIn } from '../shared/animations';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgFor, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations:[fadeIn]
})
export class NavbarComponent {
  links = navLinks;
  role!: string | null;
  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(){
    this.role = this.authService.getUserRole();
    this.links = navLinks.filter(link =>
      this.role && link.roles.includes(this.role as any)
    )
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }
}
