import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeIn, slideInUp } from '../shared/animations';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [fadeIn, slideInUp]
})
export class HomeComponent {
}
