import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// ===============
import { ArticlesService } from '../../../../core/services/articles.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articlesService = inject(ArticlesService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly categorySlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('categorySlug') ?? '')),
    { initialValue: '' },
  );

  readonly category = computed(() =>
    this.articlesService.getCategoryBySlug(this.categorySlug()),
  );
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    setTimeout(() => {
      document.getElementById('article-list')?.scrollIntoView({
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
