import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeIn, slideInUp } from '../shared/animations';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  animations:[fadeIn, slideInUp]
})
export class NotFoundComponent {

}
