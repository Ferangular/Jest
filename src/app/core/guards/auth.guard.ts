import {CanActivateFn, Router} from '@angular/router';
import { map } from 'rxjs';
import {inject} from "@angular/core";
import {AuthFirebaseService} from "../services/auth.firebase.service";

export const routerInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthFirebaseService).authState$;

export const authGuard: CanActivateFn = (route, state) => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('auth/log-in');
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  );
};
