//ngrx-reducer

import { Action, createReducer, on } from '@ngrx/store';
import { setUser,unSetUser } from './auth.actions';
import {UserFirebase} from "../models/user.firebase";


export interface State {
  user: UserFirebase | null;
}

export const initialState: State = {
  user: null,
}

const _authReducer = createReducer(initialState,

  on(setUser, (state, { user }) => ({ ...state, user: { ...user }})),
  on(unSetUser, (state) => ({ ...state, user: null })),

);

export function authReducer(state: State = initialState, action: Action) {
  return _authReducer(state, action);
}
