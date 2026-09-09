import { Component, inject } from '@angular/core';

//
import { TestCardComponent } from '../../components/test-card/test-card.component';
import { TestsService } from '../../../../core/services/tests.service';

@Component({
  selector: 'app-tests-collection',
  standalone: true,
  imports: [TestCardComponent],
  templateUrl: './tests-collection.component.html',
  styleUrl: './tests-collection.component.scss',
})
export class TestsCollectionComponent {
  private readonly testsService = inject(TestsService);

  readonly tests = this.testsService.tests;
}
