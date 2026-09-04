import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

// ================
import { ArticlesService } from '../../../../core/services/articles.service';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly articlesService = inject(ArticlesService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly categorySlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('categorySlug') ?? '')),
    { initialValue: '' },
  );

  private readonly articleSlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('articleSlug') ?? '')),
    { initialValue: '' },
  );

  readonly category = computed(() =>
    this.articlesService.getCategoryBySlug(this.categorySlug()),
  );

  readonly article = computed(() => {
    if (!this.categorySlug() || !this.articleSlug()) {
      return undefined;
    }
    return this.articlesService.getArticleBySlug(
      this.categorySlug(),
      this.articleSlug(),
    );
  });
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      document.getElementById('article-top')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
  formatDate(dateIso: string): string {
    return new Date(dateIso).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
