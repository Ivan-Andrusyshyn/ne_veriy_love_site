import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// =====
import { NavList, navList } from '../../data/nav';
import { ChangeThemeComponent } from '../../../shared/components/change-theme/change-theme.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ChangeThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private desktopMediaQuery?: MediaQueryList;
  private mediaQueryListener?: (e: MediaQueryListEvent) => void;
  navList = signal<NavList>([...navList]);

  //
  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.desktopMediaQuery = window.matchMedia('(min-width: 960px)');
    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        this.closeMenu();
      }
    };
    this.desktopMediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy(): void {
    this.desktopMediaQuery?.removeEventListener(
      'change',
      this.mediaQueryListener!,
    );
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
    this.updateBodyOverflow();
  }

  openMenu(): void {
    this.isMenuOpen.set(true);
    this.updateBodyOverflow();
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.updateBodyOverflow();
  }

  private updateBodyOverflow(): void {
    document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  }

  // Escape закриває меню
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  // тінь хедера при скролі
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 8);
  }
}
