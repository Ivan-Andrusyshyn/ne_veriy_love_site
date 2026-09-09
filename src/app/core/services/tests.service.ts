import { Injectable, signal } from '@angular/core';

// =====
import { TESTS } from '../../features/tests/tests-data/card-list';
import { PsychTest } from '../../features/tests/models/cards.model';

@Injectable({ providedIn: 'root' })
export class TestsService {
  private readonly _tests = signal<PsychTest[]>(TESTS);

  readonly tests = this._tests.asReadonly();

  getBySlug(slug: string): PsychTest | undefined {
    return this._tests().find((test) => test.slug === slug);
  }
}
