import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Loading...';
export const DISABLED_LOADING = '[UI Loading] End of loading...';

export class ActivateLoadingAction implements Action {
  readonly type = ACTIVATE_LOADING;
};

export class DisabledLoadingAction implements Action {
  readonly type = DISABLED_LOADING;
};

export type actions = ActivateLoadingAction | DisabledLoadingAction;