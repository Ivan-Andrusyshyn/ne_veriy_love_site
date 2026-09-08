import { Component } from '@angular/core';

// =
import { Sign, SIGNS } from './signs';

@Component({
  selector: 'app-signs',
  standalone: true,
  imports: [],
  templateUrl: './signs.component.html',
  styleUrl: './signs.component.scss',
})
export class SignsComponent {
  readonly signs: Sign[] = [...SIGNS];
}
