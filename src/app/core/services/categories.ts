import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of, tap } from 'rxjs';
import { Category, NewCategoryPayload } from '../models/category';

const STORAGE_KEY = 'lvl_categories_created';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>('/mock/categories.json')
      .pipe(map((categories) => [...this.readCreated(), ...categories]));
  }

  createCategory(payload: NewCategoryPayload): Observable<Category> {
    const category: Category = {
      id: Date.now(),
      name: payload.name,
      subtitle: payload.subtitle,
      description: payload.description,
      type: payload.type || 'Documento',
      company: payload.company,
      imageUrl: payload.imageUrl || `https://picsum.photos/seed/${Date.now()}/100/100`,
      date: this.formatDate(new Date()),
    };

    return of(category).pipe(
      delay(600),
      tap((created) => this.saveCreated(created)),
    );
  }

  private saveCreated(category: Category): void {
    const created = this.readCreated();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([category, ...created]));
  }

  private readCreated(): Category[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Category[]) : [];
  }

  private formatDate(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yy} - ${hh}:${min} hrs.`;
  }
}
