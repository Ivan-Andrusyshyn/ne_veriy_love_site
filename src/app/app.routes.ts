import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tests-collection',
    loadComponent: () =>
      import('./features/tests/pages/tests-collection/tests-collection.component').then(
        (c) => c.TestsCollectionComponent,
      ),
  },
  {
    path: 'tests-collection/:testName',
    loadComponent: () =>
      import('./features/tests/pages/test/test.component').then(
        (c) => c.TestComponent,
      ),
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
    ],
  },
  {
    path: 'articles/:categorySlug',
    loadComponent: () =>
      import('./features/articles/pages/article-list/article-list.component').then(
        (m) => m.ArticleListComponent,
      ),
  },
  {
    path: 'articles/:categorySlug/:articleSlug',
    loadComponent: () =>
      import('./features/articles/pages/article/article.component').then(
        (m) => m.ArticleComponent,
      ),
  },
];
