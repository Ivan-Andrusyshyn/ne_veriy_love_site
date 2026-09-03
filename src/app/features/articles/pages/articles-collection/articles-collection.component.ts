import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

// ========================
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles-collection',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, RouterOutlet],
  templateUrl: './articles-collection.component.html',
  styleUrl: './articles-collection.component.scss',
})
export class ArticlesCollectionComponent {
  private readonly articlesService = inject(ArticlesService);
  readonly categories = this.articlesService.categories;
}
