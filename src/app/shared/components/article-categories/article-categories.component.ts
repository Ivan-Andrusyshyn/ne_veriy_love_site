import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

//

import { ArticleCategory } from '../../../features/articles/types/ArticleCategory.type';

@Component({
  selector: 'app-article-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-categories.component.html',
  styleUrl: './article-categories.component.scss',
})
export class ArticleCategoriesComponent {
  categories = input<ArticleCategory[]>();
}
