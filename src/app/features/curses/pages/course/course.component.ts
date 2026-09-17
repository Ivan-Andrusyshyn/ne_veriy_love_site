import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CourseProgressService } from '../../services/course-progress.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly progressService = inject(CourseProgressService);

  private readonly courseId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('courseName') ?? '')),
    { initialValue: '' },
  );

  readonly course = computed(() =>
    this.progressService.getCourseById(this.courseId()),
  );
  readonly sections = computed(() =>
    this.progressService.getSections(this.courseId()),
  );
  readonly totals = computed(() =>
    this.progressService.getTotals(this.courseId()),
  );

  readonly expandedLessonId = signal<string | null>(null);

  toggleLesson(lessonId: string, status: string): void {
    if (status === 'locked') {
      return;
    }
    this.expandedLessonId.update((current) =>
      current === lessonId ? null : lessonId,
    );
  }

  markComplete(lessonId: string, event: Event): void {
    event.stopPropagation();
    this.progressService.toggleComplete(this.courseId(), lessonId);
  }

  sideClass(globalIndex: number): string {
    const pattern = ['side-left', 'side-center', 'side-right', 'side-center'];
    return pattern[globalIndex % pattern.length];
  }
}
