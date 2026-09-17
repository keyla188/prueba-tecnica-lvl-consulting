import { Routes } from '@angular/router';

export const PAGINAS_WEBS_ROUTES: Routes = [
  {
    path: 'categorias',
    loadComponent: () =>
      import('./categorias/categorias').then((m) => m.Categories),
  },
  {
    path: 'categorias/nuevo',
    loadComponent: () =>
      import('./nuevo-formulario/nuevo-formulario').then((m) => m.NewCategoryForm),
  },
  {
    path: 'formulario-contacto',
    loadComponent: () =>
      import('./formulario-contacto/formulario-contacto').then((m) => m.ContactForm),
  },
];
