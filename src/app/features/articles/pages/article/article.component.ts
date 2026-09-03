import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';

// ================
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly articlesService = inject(ArticlesService);

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

  formatDate(dateIso: string): string {
    return new Date(dateIso).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
