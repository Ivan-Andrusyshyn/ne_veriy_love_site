export type NavList = {
  name: string;
  id: string;
  label: string;
}[];

export const navList: Readonly<NavList> = [
  {
    name: 'hero-tests',
    id: 'hero-tests',
    label: 'Психологічні тести',
  },
  {
    name: 'articles',
    id: 'articles',
    label: 'Статті',
  },
  {
    name: 'week-article',
    id: 'week-article',
    label: 'Стаття цього тижня',
  },
  {
    name: 'about',
    id: 'about',
    label: 'Про проєкт',
  },
  {
    name: 'faq',
    id: 'faq',
    label: 'Часті питання',
  },
  {
    name: 'community',
    id: 'community',
    label: 'Телеграм',
  },
];
