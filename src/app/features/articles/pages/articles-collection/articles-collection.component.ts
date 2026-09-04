import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

// ========================
import { ArticleCategoriesComponent } from '../../../../shared/components/article-categories/article-categories.component';
import { ArticlesService } from '../../../../core/services/articles.service';

@Component({
  selector: 'app-articles-collection',
  standalone: true,
  imports: [ArticleCategoriesComponent, RouterOutlet],
  templateUrl: './articles-collection.component.html',
  styleUrl: './articles-collection.component.scss',
})
export class ArticlesCollectionComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly categories = this.articlesService.categories;
}
