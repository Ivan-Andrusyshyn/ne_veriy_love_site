import { Component, computed, signal } from '@angular/core';

// =
import { QUESTIONS, RESULT_BANDS } from '../../tests-data/self-esteem';
import { OPTIONS, Screen, ResultBand } from '../../models/questions.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  readonly options = OPTIONS;
  readonly questions = QUESTIONS;

  readonly screen = signal<Screen>('intro');
  readonly currentIndex = signal(0);
  readonly answers = signal<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null),
  );

  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()],
  );
  readonly currentImageUrl = computed(
    () => `https://picsum.photos/seed/${this.currentQuestion().img}/700/450`,
  );
  readonly progressPercent = computed(
    () => (this.currentIndex() / this.questions.length) * 100,
  );

  readonly score = computed(() =>
    this.answers().reduce<number>((total, chosen, i) => {
      if (chosen === null) {
        return total;
      }
      const question = this.questions[i];
      const points = question.positive ? chosen + 1 : 4 - chosen;
      return total + points;
    }, 0),
  );

  readonly resultBand = computed<ResultBand>(
    () =>
      RESULT_BANDS.find((band) => this.score() <= band.max) ??
      RESULT_BANDS[RESULT_BANDS.length - 1],
  );

  readonly gaugePercent = computed(() => {
    const min = 10;
    const max = this.questions.length * 4;
    return Math.round(((this.score() - min) / (max - min)) * 100);
  });

  isSelected(optionIndex: number): boolean {
    return this.answers()[this.currentIndex()] === optionIndex;
  }

  start(): void {
    this.currentIndex.set(0);
    this.answers.set(new Array(this.questions.length).fill(null));
    this.screen.set('question');
  }

  restart(): void {
    this.screen.set('intro');
  }

  selectAnswer(optionIndex: number): void {
    const next = [...this.answers()];
    next[this.currentIndex()] = optionIndex;
    this.answers.set(next);

    setTimeout(() => {
      if (this.currentIndex() < this.questions.length - 1) {
        this.currentIndex.update((i) => i + 1);
      } else {
        this.screen.set('result');
      }
    }, 180);
  }
}
