export interface Question {
  img: string;
  text: string;
  positive: boolean;
}

export interface ResultBand {
  max: number;
  title: string;
  text: string;
}

export type Screen = 'intro' | 'question' | 'result';

export const OPTIONS = ['Ніколи', 'Рідко', 'Часто', 'Завжди'] as const;
