//ngrx-actions
import { createAction, props } from '@ngrx/store';
import {UserFirebase} from "../models/user.firebase";


export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: UserFirebase }>()
);

export const unSetUser = createAction(
  '[Auth] unSetUser',
);
