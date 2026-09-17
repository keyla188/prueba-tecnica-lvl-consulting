import { Routes } from '@angular/router';
import { guestGuard } from '../../core/guards/guest-guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'crear-cuenta',
    loadComponent: () =>
      import('./crear-cuenta/crear-cuenta').then((m) => m.CreateAccount),
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then((m) => m.Login),
    canActivate: [guestGuard],
  },
];
