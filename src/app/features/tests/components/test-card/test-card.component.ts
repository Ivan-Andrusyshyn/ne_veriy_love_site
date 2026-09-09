import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

// =
import { PsychTest } from '../../models/cards.model';

@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss',
})
export class TestCardComponent {
  @Input({ required: true }) test!: PsychTest;
}
