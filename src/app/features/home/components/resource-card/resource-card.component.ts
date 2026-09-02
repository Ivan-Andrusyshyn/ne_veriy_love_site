import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// ===============================
import { ResourceCard } from '../../services/resource-cards.service';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss'],
})
export class ResourceCardComponent {
  @Input({ required: true }) card!: ResourceCard;
}
