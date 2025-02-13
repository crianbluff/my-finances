import * as fromEntryEgress from '@earnings-expenses/actions/earnings-expenses-action';

// Reducers
import { AppState } from '@app/app.reducer';

// Models
import { EntryEgress } from '@sh-models/earnings-expenses.model';

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