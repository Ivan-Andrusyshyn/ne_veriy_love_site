import { Question, ResultBand, TestsData } from '../models/questions.model';

export const testSamoocinkyDescription = {
  kicker: 'Самопізнання · 5 хвилин',
  title: 'Тест на самоповагу',
  description:
    '10 коротких тверджень про те, як ти ставишся до себе щодня — не в теорії, а насправді. Чесних відповідей достатньо, ідеальних не існує.',
  meta: {
    duration: '5 хвилин',
    questions: '10 питань',
    privacy: 'Анонімно',
  },
  startButton: 'Почати тест',
  resultKicker: 'Результат',
  resultMaxLabel: ' / ',
  resultNote:
    'Це не діагностичний інструмент і не замінює консультацію психолога. Якщо тема самооцінки відгукується сильно й довго заважає жити — варто поговорити з фахівцем.',
  restartButton: '↺ Пройти ще раз',
} as const;
export const testSamoocinkyQuestions: Question[] = [
  {
    img: 'esteem-mirror-1',
    text: 'Я вважаю, що заслуговую на повагу так само, як і інші люди.',
    positive: true,
  },
  {
    img: 'esteem-hands-2',
    text: 'Мені важко похвалити себе навіть за реальні досягнення.',
    positive: false,
  },
  {
    img: 'esteem-compare-3',
    text: 'Я порівнюю себе з іншими і майже завжди програю в цьому порівнянні.',
    positive: false,
  },
  {
    img: 'esteem-gift-4',
    text: 'Я можу спокійно прийняти комплімент, а не одразу применшити його.',
    positive: true,
  },
  {
    img: 'esteem-notes-5',
    text: 'Я дозволяю собі помилятися, не картаючи себе годинами.',
    positive: true,
  },
  {
    img: 'esteem-window-6',
    text: 'Мені страшно висловити свою думку, бо здається, що вона нічого не варта.',
    positive: false,
  },
  {
    img: 'esteem-leaf-7',
    text: 'Моя цінність не залежить від того, що про мене думають інші.',
    positive: true,
  },
  {
    img: 'esteem-crowd-8',
    text: 'Я часто підлаштовуюсь під інших, аби мене прийняли.',
    positive: false,
  },
  {
    img: 'esteem-summit-9',
    text: 'Я пишаюсь тим, як справляюсь зі складнощами.',
    positive: true,
  },
  {
    img: 'esteem-door-10',
    text: 'Мені важко сказати «ні», навіть коли це шкодить мені.',
    positive: false,
  },
];

export const testSamoocinkyResult: ResultBand[] = [
  {
    max: 19,
    title: 'Опора на себе зараз нестабільна',
    text: 'Схоже, внутрішній критик зараз голосніший за підтримку. Це не вирок і не риса характеру — це стан, який складався поступово і так само поступово може змінюватись. Спробуй помічати щодня одну дрібницю, за яку можеш себе підтримати, без «але».',
  },
  {
    max: 29,
    title: 'Самооцінка залежить від ситуації',
    text: 'У знайомих умовах ти спираєшся на себе впевнено, але під тиском чи чужою оцінкою це відчуття хитається. Це доволі типово — питання не «чи є самоповага», а як зробити її менш залежною від зовнішніх обставин.',
  },
  {
    max: 40,
    title: 'Стабільна опора на себе',
    text: 'Ти здебільшого спираєшся на власну оцінку, а не на чужу, і вмієш бути на своєму боці навіть у складні моменти. Це не означає відсутність сумнівів — просто вони більше не визначають, як ти до себе ставишся.',
  },
];

export const testsData: TestsData[] = [
  {
    testName: 'test-samoocinky',
    questions: testSamoocinkyQuestions,
    results: testSamoocinkyResult,
    description: { ...testSamoocinkyDescription },
  },
] as const;
