import {
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

//
import { CourseProgressService } from '../../services/course-progress.service';

type ViewMode = 'map' | 'lesson';

const SESSION_KEY = 'course_ui_state';
const PROGRESS_KEY_PREFIX = 'course_progress_';

interface UiState {
  viewMode: ViewMode;
  activeLessonId: string | null;
  cardIndex: number;
}

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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
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

  readonly viewMode = signal<ViewMode>('map');
  readonly activeLessonId = signal<string | null>(null);
  readonly cardIndex = signal(0);

  readonly activeLesson = computed(() => {
    const id = this.activeLessonId();
    if (!id) return undefined;
    return this.sections()
      .flatMap((s) => s.lessons)
      .find((l) => l.id === id);
  });

  readonly totalCards = computed(
    () => this.activeLesson()?.content.length ?? 0,
  );
  readonly currentCard = computed(
    () => this.activeLesson()?.content[this.cardIndex()],
  );
  readonly isFirstCard = computed(() => this.cardIndex() === 0);
  readonly isLastCard = computed(
    () => this.cardIndex() === this.totalCards() - 1,
  );

  constructor() {
    this.restoreUiState();

    effect(() => {
      const id = this.courseId();
      const secs = this.sections();

      if (!id || secs.length === 0) return;

      this.restoreProgress(id);

      const total = this.totalCards();
      if (total > 0 && this.cardIndex() >= total) {
        this.cardIndex.set(Math.max(0, total - 1));
      }

      if (this.activeLessonId() && !this.activeLesson()) {
        this.viewMode.set('map');
        this.activeLessonId.set(null);
      }
    });

    effect(() => {
      const state: UiState = {
        viewMode: this.viewMode(),
        activeLessonId: this.activeLessonId(),
        cardIndex: this.cardIndex(),
      };
      if (this.isBrowser) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
      }
    });
  }

  openLesson(lessonId: string, status: string): void {
    if (status === 'locked') return;

    this.cardIndex.set(0);
    this.activeLessonId.set(lessonId);
    this.viewMode.set('lesson');
  }

  exitLesson(): void {
    this.viewMode.set('map');
    this.activeLessonId.set(null);
  }

  nextCard(): void {
    if (this.isLastCard()) return;
    this.cardIndex.update((i) => i + 1);
  }

  prevCard(): void {
    this.cardIndex.update((i) => Math.max(0, i - 1));
  }

  finishLesson(): void {
    const lesson = this.activeLesson();
    if (!lesson || lesson.status === 'completed' || !this.isLastCard()) {
      return;
    }

    this.progressService.toggleComplete(this.courseId(), lesson.id);
    this.saveProgress();
  }

  sideClass(globalIndex: number): string {
    const pattern = ['side-left', 'side-center', 'side-right', 'side-center'];
    return pattern[globalIndex % pattern.length];
  }

  // ================
  private restoreUiState(): void {
    try {
      if (!this.isBrowser) return;
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;

      const state = JSON.parse(raw) as UiState;

      if (state.viewMode === 'map' || state.viewMode === 'lesson') {
        this.viewMode.set(state.viewMode);
      }
      if (
        typeof state.activeLessonId === 'string' ||
        state.activeLessonId === null
      ) {
        this.activeLessonId.set(state.activeLessonId);
      }
      if (typeof state.cardIndex === 'number' && state.cardIndex >= 0) {
        this.cardIndex.set(state.cardIndex);
      }
    } catch {
      if (this.isBrowser) {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }

  private restoreProgress(courseId: string): void {
    try {
      if (!this.isBrowser) return;
      const raw = localStorage.getItem(PROGRESS_KEY_PREFIX + courseId);
      if (!raw) return;

      const completedIds: string[] = JSON.parse(raw);
      if (!Array.isArray(completedIds)) return;

      completedIds.forEach((lessonId) => {
        const lesson = this.sections()
          .flatMap((s) => s.lessons)
          .find((l) => l.id === lessonId);

        if (lesson && lesson.status !== 'completed') {
          this.progressService.toggleComplete(courseId, lessonId);
        }
      });
    } catch {
      if (!this.isBrowser) return;
      localStorage.removeItem(PROGRESS_KEY_PREFIX + courseId);
    }
  }

  private saveProgress(): void {
    const id = this.courseId();
    if (!id) return;

    const completedIds = this.sections()
      .flatMap((s) => s.lessons)
      .filter((l) => l.status === 'completed')
      .map((l) => l.id);
    if (!this.isBrowser) return;
    localStorage.setItem(
      PROGRESS_KEY_PREFIX + id,
      JSON.stringify(completedIds),
    );
  }
}
