import { Component } from '@angular/core';

// ===============================
import { HeroComponent } from './components/hero/hero.component';
import { ManifestoComponent } from './components/manifesto/manifesto.component';
import { TopicsComponent } from './components/topics/topics.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { SignsComponent } from './components/signs/signs.component';
import { CheckInComponent } from './components/check-in/check-in.component';

import { FaqComponent } from './components/faq/faq.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { CommunityComponent } from './components/community/community.component';
import { TestsHeroComponent } from './components/tests-hero/tests-hero.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ManifestoComponent,
    TopicsComponent,
    FeaturedComponent,
    SignsComponent,
    CheckInComponent,
    ArticlesComponent,
    CommunityComponent,
    FaqComponent,
    TestsHeroComponent,
    MyCoursesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
