import { Action } from '@ngrx/store';
import { EntryEgress } from './entry-egress.model';

export const SET_ITEMS = '[Entry Egress] Set Items';
export const UNSET_ITEMS = '[Entry Egress] Unset Items';

export class SetItemsActions implements Action {
  readonly type = SET_ITEMS;

  constructor( public items: EntryEgress[] ) {}
};

export class UnsetItemsActions implements Action {
  readonly type = UNSET_ITEMS;
};

export type actions = SetItemsActions | UnsetItemsActions;