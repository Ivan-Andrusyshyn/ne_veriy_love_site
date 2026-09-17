/**
 * Один канонічний тип курсу замість двох несумісних (Course і CourseCard),
 * які були раніше. Дані більше НЕ несуть власний lesson.status — статус
 * завжди обчислюється з реального прогресу користувача, інакше картка
 * курсу й сторінка проходження показували два різні, неузгоджені прогреси.
 */

export type LessonStatus = 'locked' | 'available' | 'completed';

export interface CourseLesson {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly content: string;
  readonly icon: string;
  readonly durationMinutes: number;
}

export interface CourseSection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly lessons: readonly CourseLesson[];
}

export interface Course {
  /** Єдиний ідентифікатор курсу — використовується і в роуті, і в ключі localStorage */
  readonly id: string;
  readonly kicker: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly CourseSection[];
}

/** Урок, збагачений обчисленим статусом і позицією — те, що реально рендерить roadmap */
export interface LessonWithStatus extends CourseLesson {
  readonly status: LessonStatus;
  readonly sectionId: string;
  readonly sectionTitle: string;
  readonly positionInSection: number;
  readonly globalIndex: number;
}

export interface SectionWithStatus {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly lessons: readonly LessonWithStatus[];
  readonly completedCount: number;
  readonly totalCount: number;
}

/** Агреговані цифри по курсу — і для сторінки проходження, і для картки */
export interface CourseTotals {
  readonly total: number;
  readonly completed: number;
  readonly percent: number;
  readonly hasStarted: boolean;
  readonly isFinished: boolean;
}

/** Те, що реально споживає картка курсу — курс + вже готові цифри й підпис кнопки */
export interface CourseViewModel extends Course {
  readonly totals: CourseTotals;
  readonly totalMinutes: number;
  readonly ctaLabel: string;
  /** Перші кілька уроків (з реальним статусом) — для прев'ю-стежки на картці */
  readonly previewLessons: readonly LessonWithStatus[];
}

export interface CourseProgressSnapshot {
  readonly courseId: string;
  readonly completedLessonIds: readonly string[];
}
