import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    },
    {
        path: '',
        loadComponent: () =>
            import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
            },
            {
                path: 'paginas-webs',
                loadChildren: () =>
                    import('./features/paginas-webs/paginas-webs.routes').then((m) =>
                        m.PAGINAS_WEBS_ROUTES),
            },
        ],
    },
];