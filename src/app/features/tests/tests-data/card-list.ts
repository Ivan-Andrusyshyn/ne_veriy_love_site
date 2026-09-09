import { PsychTest } from '../models/cards.model';

export const TESTS: PsychTest[] = [
  {
    slug: 'samoocinka',
    title: 'Тест на самоповагу',
    description:
      '10 коротких тверджень про те, як ти ставишся до себе щодня — не в теорії, а насправді.',
    imageUrl: 'https://picsum.photos/seed/test-samoocinka-cover/700/500',
    duration: '5 хвилин',
    questionsCount: 10,
    route: '/tests-collection/test-samoocinky',
  },
];
