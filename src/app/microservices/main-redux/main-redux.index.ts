import { Routes } from '@angular/router';

import { MainReduxComponent } from './main-redux.component';
import { DetailComponent } from './detail/detail.component';
import { ChartComponent } from './chart/chart.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';

export const MAIN_REDUX_ROUTES: Routes = [
  //canActivate: [ AuthGuard ]
  {
    path: '',
    component: MainReduxComponent,
    children: [
      { path: '', component: DetailComponent, title: 'Detalles' },
      { path: 'detail', component: DetailComponent, title: 'Detalles' },
      { path: 'ingreso-egreso', component: IngresoEgresoComponent, title: 'Ingreso-egreso' },
      { path: 'charts', component: ChartComponent, title: 'Detalles' },
    ],
  },
];
