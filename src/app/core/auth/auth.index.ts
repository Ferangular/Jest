import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', title: 'Access', component: LoginComponent },
  { path: 'register', title: 'Access', component: RegisterComponent },
  { path: 'access-denied', title: 'Access denied', component: AccessDeniedComponent },
  { path: 'error', title: 'Error', component: ErrorComponent },
];
