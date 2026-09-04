import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

const SCROLL_THRESHOLD = 400;

@Component({
  selector: 'app-btn-to-top',
  standalone: true,
  imports: [],
  templateUrl: './btn-to-top.component.html',
  styleUrl: './btn-to-top.component.scss',
})
export class BtnToTopComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isVisible = signal(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const onScroll = () => {
      this.isVisible.set(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() =>
      window.removeEventListener('scroll', onScroll),
    );
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }
}
