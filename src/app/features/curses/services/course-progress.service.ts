import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

// =
import { COURSES } from '../data/courses-collection';
import {
  Course,
  CourseProgressSnapshot,
  CourseTotals,
  CourseViewModel,
  LessonWithStatus,
  SectionWithStatus,
} from '../models/Course';

const STORAGE_PREFIX = 'nvt-course-progress:';

@Injectable({ providedIn: 'root' })
export class CourseProgressService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly courses = signal<Course[]>(COURSES);

  private readonly progressByCourse = signal<
    Record<string, ReadonlySet<string>>
  >(this.loadAll(COURSES));

  getCourseById(courseId: string): Course | undefined {
    return this.courses().find((c) => c.id === courseId);
  }

  getSections(courseId: string): SectionWithStatus[] {
    const course = this.getCourseById(courseId);
    if (!course) return [];

    const completed = this.progressByCourse()[courseId] ?? new Set<string>();
    let globalIndex = 0;
    let previousLessonCompleted = true;

    return course.sections.map((section) => {
      const lessons: LessonWithStatus[] = section.lessons.map((lesson, i) => {
        const isCompleted = completed.has(lesson.id);
        const status = isCompleted
          ? 'completed'
          : previousLessonCompleted
            ? 'available'
            : 'locked';

        previousLessonCompleted = isCompleted;

        const withStatus: LessonWithStatus = {
          ...lesson,
          status,
          sectionId: section.id,
          sectionTitle: section.title,
          positionInSection: i + 1,
          globalIndex,
        };
        globalIndex++;
        return withStatus;
      });

      return {
        id: section.id,
        title: section.title,
        description: section.description,
        lessons,
        completedCount: lessons.filter((l) => l.status === 'completed').length,
        totalCount: lessons.length,
      };
    });
  }

  getTotals(courseId: string): CourseTotals {
    const sections = this.getSections(courseId);
    const total = sections.reduce((sum, s) => sum + s.totalCount, 0);
    const completed = sections.reduce((sum, s) => sum + s.completedCount, 0);

    return {
      total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
      hasStarted: completed > 0,
      isFinished: total > 0 && completed === total,
    };
  }

  readonly courseCards = computed<CourseViewModel[]>(() =>
    this.courses().map((course) => this.toViewModel(course)),
  );

  toggleComplete(courseId: string, lessonId: string): void {
    const current = this.progressByCourse()[courseId] ?? new Set<string>();
    const next = new Set(current);

    if (next.has(lessonId)) {
      next.delete(lessonId);
    } else {
      next.add(lessonId);
    }

    this.progressByCourse.update((map) => ({ ...map, [courseId]: next }));
    this.saveProgress(courseId, next);
  }

  markComplete(courseId: string, lessonId: string): void {
    const current = this.progressByCourse()[courseId] ?? new Set<string>();
    if (current.has(lessonId)) return;

    const next = new Set(current);
    next.add(lessonId);

    this.progressByCourse.update((map) => ({ ...map, [courseId]: next }));
    this.saveProgress(courseId, next);
  }

  markIncomplete(courseId: string, lessonId: string): void {
    const current = this.progressByCourse()[courseId] ?? new Set<string>();
    if (!current.has(lessonId)) return;

    const next = new Set(current);
    next.delete(lessonId);

    this.progressByCourse.update((map) => ({ ...map, [courseId]: next }));
    this.saveProgress(courseId, next);
  }

  resetProgress(courseId: string): void {
    this.progressByCourse.update((map) => ({
      ...map,
      [courseId]: new Set<string>(),
    }));
    this.saveProgress(courseId, new Set());
  }

  isLessonCompleted(courseId: string, lessonId: string): boolean {
    return this.progressByCourse()[courseId]?.has(lessonId) ?? false;
  }

  getNextLesson(courseId: string): LessonWithStatus | null {
    const sections = this.getSections(courseId);
    for (const section of sections) {
      const next = section.lessons.find((l) => l.status === 'available');
      if (next) return next;
    }
    return null;
  }

  private toViewModel(course: Course): CourseViewModel {
    const sections = this.getSections(course.id);
    const totals = this.getTotals(course.id);
    const totalMinutes = sections
      .flatMap((s) => s.lessons)
      .reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0);

    return {
      ...course,
      totals,
      totalMinutes,
      ctaLabel: totals.isFinished
        ? 'Переглянути ще раз'
        : totals.hasStarted
          ? 'Продовжити курс'
          : 'Почати курс',
      previewLessons: sections.flatMap((s) => s.lessons).slice(0, 6),
    };
  }

  private loadAll(courses: Course[]): Record<string, ReadonlySet<string>> {
    const result: Record<string, ReadonlySet<string>> = {};
    for (const course of courses) {
      result[course.id] = this.loadProgress(course.id);
    }
    return result;
  }

  private loadProgress(courseId: string): Set<string> {
    if (!this.isBrowser) return new Set();

    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + courseId);
      if (!raw) return new Set();

      const parsed: CourseProgressSnapshot = JSON.parse(raw);
      return new Set(parsed.completedLessonIds ?? []);
    } catch {
      return new Set();
    }
  }

  private saveProgress(courseId: string, completed: ReadonlySet<string>): void {
    if (!this.isBrowser) return;

    try {
      const snapshot: CourseProgressSnapshot = {
        courseId,
        completedLessonIds: [...completed],
      };
      localStorage.setItem(STORAGE_PREFIX + courseId, JSON.stringify(snapshot));
    } catch {}
  }
}
