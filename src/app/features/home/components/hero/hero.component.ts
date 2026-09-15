import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

// =============================
import { ResourceCardComponent } from '../../../../shared/components/resource-card/resource-card.component';
import {
  ResourceCard,
  ResourceCardsService,
} from '../../services/resource-cards.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, ResourceCardComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  private readonly cardsService = inject(ResourceCardsService);

  readonly telegramLink = 'https://t.me/ne_veriy_tebe';

  readonly cards = this.cardsService.cards;

  readonly activeIndex = signal(0);

  readonly canGoPrev = computed(() => this.activeIndex() > 0);
  readonly canGoNext = computed(
    () => this.activeIndex() < this.cards().length - 1,
  );

  trackByCardId(_index: number, card: ResourceCard): string {
    return card.id;
  }

  next(): void {
    if (this.canGoNext()) {
      this.activeIndex.update((i) => i + 1);
    }
  }

  prev(): void {
    if (this.canGoPrev()) {
      this.activeIndex.update((i) => i - 1);
    }
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  // --- Свайп на мобільних пристроях ---
  private touchStartX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const SWIPE_THRESHOLD = 40;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      this.next();
    } else {
      this.prev();
    }
  }
}
