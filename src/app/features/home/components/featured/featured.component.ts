import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ArticlesService } from '../../../../core/services/articles.service';

interface FeaturedArticle {
  categorySlug: string;
  articleSlug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

const ROTATION_INTERVAL_MS = 5 * 60 * 1000;
const CHECK_INTERVAL_MS = 60 * 1000;

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent {
  private readonly articlesService = inject(ArticlesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly rotationBucket = signal(this.getRotationBucket());

  private readonly articles = computed<FeaturedArticle[]>(() =>
    this.articlesService.categories().flatMap((category) =>
      category.articles.map((article) => ({
        categorySlug: category.slug,
        articleSlug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        imageUrl: article.imageUrl,
      })),
    ),
  );

  readonly featured = computed<FeaturedArticle | undefined>(() => {
    const articles = this.articles();

    if (!articles.length) {
      return undefined;
    }

    return articles[this.rotationBucket() % articles.length];
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const intervalId = setInterval(() => {
      const nextBucket = this.getRotationBucket();

      if (nextBucket !== this.rotationBucket()) {
        this.rotationBucket.set(nextBucket);
      }
    }, CHECK_INTERVAL_MS);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }

  private getRotationBucket(): number {
    return Math.floor(Date.now() / ROTATION_INTERVAL_MS);
  }
}
