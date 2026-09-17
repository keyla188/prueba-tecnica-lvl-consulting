import { Injectable, signal } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { AuthUser, LoginPayload, RegisterPayload } from '../models/auth';

const STORAGE_KEY = 'lvl_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<AuthUser | null>(this.readFromStorage());
  readonly currentUser = this.currentUserSignal.asReadonly();

  register(payload: RegisterPayload): Observable<AuthUser> {
    const user: AuthUser = { email: payload.email, username: payload.username };
    return of(user).pipe(
      delay(600),
      tap((registeredUser) => this.setSession(registeredUser)),
    );
  }

  login(payload: LoginPayload): Observable<AuthUser> {
    const user: AuthUser = { email: payload.email, username: payload.email.split('@')[0] };
    return of(user).pipe(
      delay(600),
      tap((loggedInUser) => this.setSession(loggedInUser)),
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUserSignal.set(null);
  }

  private setSession(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  private readFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }
}
