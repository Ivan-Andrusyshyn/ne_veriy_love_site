import { Injectable, signal } from '@angular/core';

export type ResourceCard = {
  id: string;
  title: string;
  description: string;
  meta: string;
  imageUrl: string;
  link: string;
  linkLabel: string;
};

const INITIAL_CARDS: ResourceCard[] = [
  {
    id: 'conflict-course',
    title: 'Як правильно конфліктувати у стосунках',
    description:
      'Короткий інтерактивний курс про те, як сваритись так, щоб конфлікт зближував, а не руйнував довіру.',
    meta: '1 година',
    imageUrl: 'assets/images/conflict-site-1.png',
    link: 'https://ne-veriy-love-1.vercel.app/',
    linkLabel: 'Перейти до курсу',
  },
  {
    id: 'psy-tests',
    title: 'Психологічні тести',
    description:
      'Тести на тип прив’язаності, рівень тривожності у стосунках та готовність довіряти знову.',
    meta: '5–15 хв',
    imageUrl: 'assets/images/tests-site-1.png',
    link: 'https://vidchuttia.com.ua/tests',
    linkLabel: 'Пройти тест',
  },
];

@Injectable({ providedIn: 'root' })
export class ResourceCardsService {
  private readonly _cards = signal<ResourceCard[]>(INITIAL_CARDS);

  readonly cards = this._cards.asReadonly();

  add(card: ResourceCard): void {
    this._cards.update((list) => [...list, card]);
  }

  remove(id: string): void {
    this._cards.update((list) => list.filter((c) => c.id !== id));
  }
}
