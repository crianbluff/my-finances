import * as fromUI from '@earnings-expenses/actions/user-interface.action';

export interface State {
  isLoading: boolean;
};

const initState:State = {
  isLoading: false
};

export function uiReducer( state = initState, action:fromUI.actions ):State {

  switch (action.type) {
    case fromUI.ACTIVATE_LOADING:
      return {
        isLoading: true
      };

    case fromUI.DISABLED_LOADING:
      return {
        isLoading: false
      };
  
    default:
      return state;
  }

}