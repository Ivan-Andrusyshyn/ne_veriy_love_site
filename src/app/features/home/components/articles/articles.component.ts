import { Component, inject } from '@angular/core';

// ==========================
import { ArticleCategoriesComponent } from '../../../../shared/components/article-categories/article-categories.component';
import { ArticlesService } from '../../../../core/services/articles.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ArticleCategoriesComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly categories = this.articlesService.categories;
}
