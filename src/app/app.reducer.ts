import { ActionReducerMap } from '@ngrx/store';

// Reducers
import * as fromUI from '@earnings-expenses/reducers/user-interface.reducer';
import * as fromAuth from '@auth/auth.reducer';
// import * as fromEntryEgress from '@earnings-expenses/reducers/earnings-expenses.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
  // earningsExpenses: fromEntryEgress.EntryEgressState;
};

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  // earningsExpenses: fromEntryEgress.entryEgressReducer
};