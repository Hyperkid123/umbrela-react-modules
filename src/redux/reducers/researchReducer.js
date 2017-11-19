import {TEST_ACTION} from '../actions/actionTypes';

function researchReducer(state = {}, action) {
  switch (action.type) {
    case TEST_ACTION:
        return {...state, msg: 'action test was executed'}
    default:
      return state;
  }
}

export default researchReducer;
