import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { ContactFormPayload, ContactFormRecord } from '../models/contact-form';

const STORAGE_KEY = 'lvl_contact_forms_created';

@Injectable({ providedIn: 'root' })
export class ContactFormsService {
  createContactForm(payload: ContactFormPayload): Observable<ContactFormRecord> {
    const record: ContactFormRecord = {
      ...payload,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    return of(record).pipe(
      delay(600),
      tap((created) => this.save(created)),
    );
  }

  private save(record: ContactFormRecord): void {
    const created = this.readAll();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...created]));
  }

  private readAll(): ContactFormRecord[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContactFormRecord[]) : [];
  }
}
