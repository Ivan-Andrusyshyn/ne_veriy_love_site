import { Component, signal } from '@angular/core';
import { author, FAQ_ITEMS } from './faq-data';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly authorName = 'Іван';
  readonly authorBio: string = author;
  readonly telegramLink = 'https://t.me/ne_veriy_tebe';

  readonly items = [...FAQ_ITEMS];

  private readonly openIndices = signal<ReadonlySet<number>>(new Set([0]));

  isOpen(index: number): boolean {
    return this.openIndices().has(index);
  }

  toggle(index: number): void {
    const next = new Set(this.openIndices());
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this.openIndices.set(next);
  }
}
