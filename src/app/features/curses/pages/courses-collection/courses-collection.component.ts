// courses-collection.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

//
import { CourseProgressService } from '../../services/course-progress.service';

@Component({
  selector: 'app-courses-collection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-collection.component.html',
  styleUrl: './courses-collection.component.scss',
})
export class CoursesCollectionComponent {
  protected readonly progressService = inject(CourseProgressService);

  protected readonly courses = this.progressService.courseCards;
  constructor() {}
}
