import { Injectable, signal } from '@angular/core';

// ==============================================
import { ARTICLE_CATEGORIES } from '../../features/articles/data/articles';
import {
  ArticleCategory,
  Article,
} from '../../features/articles/models/ArticleCategory.type';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly _categories = signal<ArticleCategory[]>([
    ...ARTICLE_CATEGORIES,
  ]);

  readonly categories = this._categories.asReadonly();

  getCategoryBySlug(categorySlug: string): ArticleCategory | undefined {
    return this._categories().find((c) => c.slug === categorySlug);
  }

  getArticleBySlug(
    categorySlug: string,
    articleSlug: string,
  ): Article | undefined {
    return this.getCategoryBySlug(categorySlug)?.articles.find(
      (a) => a.slug === articleSlug,
    );
  }
}
