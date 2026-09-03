import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Topic {
  /** Має збігатись зі slug категорії в articles-data.ts, інакше посилання поведе в нікуди */
  slug: string;
  image: string;
  alt: string;
  title: string;
  description: string;
}

const TOPICS: Topic[] = [
  {
    slug: 'dovira-i-zrada',
    image: 'https://picsum.photos/seed/nvt-trust/500/400',
    alt: 'Символ довіри — переплетені руки',
    title: 'Довіра і зрада',
    description:
      'Як відрізнити тривожність від інтуїції, коли щось справді не так.',
  },
  {
    slug: 'tip-pryvyazanosti',
    image: 'https://picsum.photos/seed/nvt-attach/500/400',
    alt: 'Пара обіймається на світанку',
    title: "Тип прив'язаності",
    description:
      'Тривожний, уникаючий, надійний — і як це впливає на кожну сварку.',
  },
  {
    slug: 'osobysti-mezhi',
    image: 'https://picsum.photos/seed/nvt-bound/500/400',
    alt: 'Відкрите вікно з теплим світлом',
    title: 'Особисті межі',
    description:
      'Чому «я так більше не можу» часто означає «я не вмію просити».',
  },
  {
    slug: 'komunikaciya',
    image: 'https://picsum.photos/seed/nvt-comm/500/400',
    alt: 'Двоє розмовляють за кавою',
    title: 'Комунікація',
    description:
      'Розмови, які рятують стосунки, і ті, що їх повільно вбивають.',
  },
  {
    slug: 'samootsinka',
    image: 'https://picsum.photos/seed/nvt-self/500/400',
    alt: 'Людина дивиться у вікно замислено',
    title: 'Самооцінка',
    description:
      'Чому люди із заниженою самооцінкою обирають нестабільних партнерів.',
  },
  {
    slug: 'zavershennya-stosunkiv',
    image: 'https://picsum.photos/seed/nvt-end/500/400',
    alt: 'Дорога вдалину в теплих тонах',
    title: 'Завершення стосунків',
    description: 'Як розійтись, не поховавши здатність вірити комусь знову.',
  },
];

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
})
export class TopicsComponent {
  readonly topics = TOPICS;
}
