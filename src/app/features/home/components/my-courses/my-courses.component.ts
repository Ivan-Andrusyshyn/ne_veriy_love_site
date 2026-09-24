import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// =
import { CourseProgressService } from '../../../curses/services/course-progress.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss',
})
export class MyCoursesComponent {
  protected readonly progressService = inject(CourseProgressService);

  protected readonly courses = this.progressService.courseCards;
}
