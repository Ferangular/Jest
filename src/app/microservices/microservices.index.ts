import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from '../layout/shell/app.layout/app.layout.component';

export const MICROSERVICES_ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Banco de Trabajo' },
      { path: 'home', component: HomeComponent, title: 'Banco de Trabajo' },
      { path: 'project', title: 'Proyectos', loadChildren: () => import('./project/project.index').then((m) => m.PROJECT_ROUTES) },
    ],
  },
];
