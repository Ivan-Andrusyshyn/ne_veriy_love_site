import { PsychTest } from '../models/cards.model';

export const TESTS: PsychTest[] = [
  {
    slug: 'samoocinka',
    title: 'Тест на самоповагу',
    description:
      '10 коротких тверджень про те, як ти ставишся до себе щодня — не в теорії, а насправді.',
    imageUrl: 'https://picsum.photos/seed/test-samoocinka-cover2/700/500',
    duration: '5 хвилин',
    questionsCount: 10,
    route: '/tests-collection/test-samoocinky',
  },
  {
    slug: 'vnutrishniy-drug',
    title: 'Тест: наскільки ти собі друг',
    description:
      '10 легких питань про те, як ти ставишся до себе в звичайні дні. Без моралі й пафосу — просто чесно і з легкою іронією.',
    imageUrl: 'https://picsum.photos/seed/test-vnutrishniy-drug-cover2/700/500',
    duration: '5 хвилин',
    questionsCount: 10,
    route: '/tests-collection/test-vnutrishniy-drug',
  },
  {
    slug: 'asociacii',
    title: 'Тест на асоціації у стосунках',
    description:
      'Десять коротких ситуацій і твоя перша, майже автоматична реакція на них.',
    imageUrl: 'https://picsum.photos/seed/test-asociacii-cover2/700/500',
    duration: '5 хвилин',
    questionsCount: 10,
    route: '/tests-collection/test-asociacii',
  },
];
