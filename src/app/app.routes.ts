import { Routes } from '@angular/router';
import {authGuard, publicGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./microservices/microservices.index').then((m) => m.MICROSERVICES_ROUTES),
    data: { animation: 'Home' },
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./core/auth/auth.index').then((m) => m.AUTH_ROUTES),
  },
  { path: '**', redirectTo: '/auth/login' },
];
