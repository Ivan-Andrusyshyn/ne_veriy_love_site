import { Component } from '@angular/core';

// ===============================
import { HeroComponent } from './components/hero/hero.component';
import { ManifestoComponent } from './components/manifesto/manifesto.component';
import { TopicsComponent } from './components/topics/topics.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { SignsComponent } from './components/signs/signs.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { PodcastComponent } from './components/podcast/podcast.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { FaqComponent } from './components/faq/faq.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { CommunityComponent } from './components/community/community.component';

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
    PodcastComponent,
    NewsletterComponent,
    FaqComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
