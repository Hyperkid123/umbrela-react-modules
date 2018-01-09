import {
  GET_QUESTION_OPTIONS,
  REQUEST_QUESTION_OPTIONS,
  CHANGE_OPTION_TITLE,
} from '../actions/actionTypes';

import lodash from 'lodash';

const initialState = {
  options: [],
  isFetching: false,
}

export default function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUESTION_OPTIONS:
        return {...state, isFeting: true};
    case GET_QUESTION_OPTIONS:
        return {...state, isFeting: false, options: action.options};
    case CHANGE_OPTION_TITLE:
        let newOptions = [...state.options];
        newOptions[action.payload.optionOrder] = {
          ...newOptions[action.payload.optionOrder],
          title: action.payload.title
        };
        return {...state, options: newOptions}
    default:
      return state;
  }
}
