import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './components/shared/user-interface.reducer';
import * as fromAuth from './components/auth/auth.reducer';
// import * as fromEntryEgress from './components/entryEgress/entry-egress.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
  // entryEgress: fromEntryEgress.EntryEgressState;
};

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  // entryEgress: fromEntryEgress.entryEgressReducer
};