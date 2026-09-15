import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// =

import {
  OPTIONS,
  Screen,
  ResultBand,
  Question,
  TestDescription,
} from '../../models/questions.model';
import { testsData } from '../../tests-data';
import { TestsService } from '../../../../core/services/tests.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  testsService = inject(TestsService);

  readonly options = OPTIONS;
  readonly questions = signal<Question[]>([]);
  readonly results = signal<ResultBand[]>([]);
  readonly description = signal<TestDescription | null>(null);
  readonly screen = signal<Screen>('intro');
  readonly currentIndex = signal(0);

  ngOnInit(): void {
    const testName = this.activeRoute.snapshot.params['testName'];
    if (testName && typeof testName === 'string') {
      const test = testsData.find((test) => test.testName === testName);
      if (test) {
        this.questions.set(test.questions);
        this.results.set(test.results);
        this.description.set(test.description);
      }
    }
  }

  readonly answers = signal<(number | null)[]>(
    new Array(this.questions().length).fill(null),
  );

  readonly currentQuestion = computed(
    () => this.questions()[this.currentIndex()],
  );
  readonly currentImageUrl = computed(
    () => `https://picsum.photos/seed/${this.currentQuestion().img}/700/450`,
  );
  readonly progressPercent = computed(
    () => (this.currentIndex() / this.questions().length) * 100,
  );

  readonly score = computed(() =>
    this.answers().reduce<number>((total, chosen, i) => {
      if (chosen === null) {
        return total;
      }
      const question = this.questions()[i];
      const points = question.positive ? chosen + 1 : 4 - chosen;
      return total + points;
    }, 0),
  );

  readonly resultBand = computed<ResultBand>(
    () =>
      this.results().find((band) => this.score() <= band.max) ??
      this.results()[this.results().length - 1],
  );

  readonly gaugePercent = computed(() => {
    const min = 10;
    const max = this.questions().length * 4;
    return Math.round(((this.score() - min) / (max - min)) * 100);
  });
  isSelected(optionIndex: number): boolean {
    return this.answers()[this.currentIndex()] === optionIndex;
  }

  start(): void {
    this.currentIndex.set(0);
    this.answers.set(new Array(this.questions().length).fill(null));
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
      if (this.currentIndex() < this.questions().length - 1) {
        this.currentIndex.update((i) => i + 1);
      } else {
        this.screen.set('result');
      }
    }, 180);
  }
}
