import {
  Component,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

//
import { ArticleCategory } from '../../../features/articles/types/ArticleCategory.type';
import { isPlatformBrowser } from '@angular/common';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-article-categories',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './article-categories.component.html',
  styleUrl: './article-categories.component.scss',
})
export class ArticleCategoriesComponent implements OnInit {
  categories = input.required<ArticleCategory[]>();
  isSmallCard = input<boolean>();

  private readonly platformId = inject(PLATFORM_ID);
  readonly viewMode = signal<ViewMode>('grid');

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const mode = localStorage.getItem('viewMode') as ViewMode | undefined;

    this.viewMode.set(mode ?? 'grid');
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
    localStorage.setItem('viewMode', mode);
  }
}
