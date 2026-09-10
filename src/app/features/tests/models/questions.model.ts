export interface Question {
  img: string;
  text: string;
  positive: boolean;
}

export type ResultBand = {
  max: number;
  title: string;
  text: string;
};
export type TestDescription = {
  kicker: string;
  title: string;
  description: string;

  meta: {
    duration: string;
    questions: string;
    privacy: string;
  };

  startButton: string;
  resultKicker: string;
  resultMaxLabel: string;
  resultNote: string;
  restartButton: string;
};
export type Screen = 'intro' | 'question' | 'result';

export const OPTIONS = ['Ніколи', 'Рідко', 'Часто', 'Завжди'] as const;
export type TestsData = {
  testName: string;
  description: TestDescription;
  questions: Question[];
  results: ResultBand[];
};
