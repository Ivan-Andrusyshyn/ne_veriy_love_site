import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// =
import { TestsService } from '../../../../core/services/tests.service';

@Component({
  selector: 'app-tests-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tests-hero.component.html',
  styleUrl: './tests-hero.component.scss',
})
export class TestsHeroComponent {
  private readonly testsService = inject(TestsService);

  readonly testsCount = computed(() => this.testsService.tests().length);

  readonly countLabel = computed(
    () => `${this.testsCount()} ${this.pluralizeTest(this.testsCount())}`,
  );

  private pluralizeTest(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return 'тест';
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
      return 'тести';
    }
    return 'тестів';
  }
}
