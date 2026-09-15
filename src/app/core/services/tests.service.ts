import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

//
import { TESTS } from '../../features/tests/tests-data/card-list';
import { PsychTest } from '../../features/tests/models/cards.model';

@Injectable({ providedIn: 'root' })
export class TestsService {
  private readonly _tests = signal<PsychTest[]>(TESTS);
  readonly tests = this._tests.asReadonly();

  private readonly PEXELS_KEY = '34935251-caa237a886f8fd2167ae0727c';

  constructor(private http: HttpClient) {}

  getRandomPhoto(query = 'relationship'): Observable<string> {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;

    return this.http
      .get<any>(url, {
        headers: {
          Authorization: this.PEXELS_KEY,
        },
      })
      .pipe(
        map((res) => {
          if (!res.photos || res.photos.length === 0) {
            throw new Error('No photos found');
          }

          const randomIndex = Math.floor(Math.random() * res.photos.length);
          return res.photos[randomIndex].src.large;
        }),
      );
  }

  getBySlug(slug: string): PsychTest | undefined {
    return this._tests().find((test) => test.slug === slug);
  }
}
