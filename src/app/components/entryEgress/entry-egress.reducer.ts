import * as fromEntryEgress from './entry-egress-actions';
import { AppState } from '../../app.reducer';
import { EntryEgress } from './entry-egress.model';

export interface EntryEgressState {
  items: EntryEgress[];
};

export interface entryEgressReducerState extends AppState {
  entryEgress: EntryEgressState;
};

const initState: EntryEgressState = {
  items: []
};

export function entryEgressReducer( state = initState, action:fromEntryEgress.actions ):EntryEgressState {
  
  switch (action.type) {
    case fromEntryEgress.SET_ITEMS:
      return {
        items: [
          ...action.items.map( item => {
            return {
              ...item
            }
          })
        ]
      };

    case fromEntryEgress.UNSET_ITEMS:
      return {
        items: []
      }
  
    default:
      return state;
  }

};