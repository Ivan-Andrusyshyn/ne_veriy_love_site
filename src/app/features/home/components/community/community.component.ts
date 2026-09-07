import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

interface Slide {
  src: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    src: 'https://picsum.photos/seed/nvt-community-1/700/875',
    alt: 'Люди тепло розмовляють за чашкою чаю',
  },
  {
    src: 'https://picsum.photos/seed/nvt-community-2/700/875',
    alt: 'Телефон з відкритим чатом підтримки в теплому світлі',
  },
  {
    src: 'https://picsum.photos/seed/nvt-community-3/700/875',
    alt: 'Людина спокійно читає повідомлення ввечері',
  },
  {
    src: 'https://picsum.photos/seed/nvt-community-4/700/875',
    alt: 'Двоє друзів підтримують одне одного',
  },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly telegramLink = 'https://t.me/ne_veriy_tebe';
  readonly slides = SLIDES;

  readonly activeIndex = signal(0);

  private autoplayId: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;

  constructor() {
    // Автоплей запускаємо лише в браузері — на сервері немає window/timers,
    // а setInterval, який ніхто не прибере, ще й тримав би SSR-рендер живим.
    if (this.isBrowser) {
      this.startAutoplay();
      this.destroyRef.onDestroy(() => this.stopAutoplay());
    }
  }

  goTo(index: number): void {
    this.activeIndex.set((index + this.slides.length) % this.slides.length);
  }

  next(): void {
    this.goTo(this.activeIndex() + 1);
  }

  prev(): void {
    this.goTo(this.activeIndex() - 1);
  }

  onDotClick(index: number): void {
    this.goTo(index);
    this.restartAutoplay();
  }

  onArrowClick(direction: 'next' | 'prev'): void {
    direction === 'next' ? this.next() : this.prev();
    this.restartAutoplay();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.next();
      this.restartAutoplay();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
      this.restartAutoplay();
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }
    deltaX < 0 ? this.next() : this.prev();
    this.restartAutoplay();
  }

  onMouseEnter(): void {
    this.stopAutoplay();
  }

  onMouseLeave(): void {
    this.startAutoplay();
  }

  onFocusIn(): void {
    this.stopAutoplay();
  }

  onFocusOut(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (!this.isBrowser || this.slides.length <= 1) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    this.autoplayId = setInterval(() => this.next(), AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    if (this.autoplayId !== null) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
