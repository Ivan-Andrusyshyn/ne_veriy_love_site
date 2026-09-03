import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./features/articles/pages/articles-collection/articles-collection.component').then(
        (m) => m.ArticlesCollectionComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/articles/pages/article/article.component').then(
            (m) => m.ArticleComponent,
          ),
      },
      {
        path: ':categorySlug',
        loadComponent: () =>
          import('./features/articles/pages/article-list/article-list.component').then(
            (m) => m.ArticleListComponent,
          ),
      },
      {
        path: ':categorySlug/:articleSlug',
        loadComponent: () =>
          import('./features/articles/pages/article/article.component').then(
            (m) => m.ArticleComponent,
          ),
      },
    ],
  },
];
