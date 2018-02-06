import {
  GET_QUESTION_OPTIONS,
  REQUEST_QUESTION_OPTIONS,
  CHANGE_OPTION_TITLE,
  DRAG_OPTION_CARD,
  OPTION_FETCH_FAILED,
  STORE_OPTIONS,
  STORE_OPTIONS_FILTERS,
  SWITCH_FILTER,
} from '../actions/actionTypes';

import lodash from 'lodash';

const initialState = {
  options: [],
  isFetching: false,
  failed: false,
  allOptions: {},
  optionsFilters: {}
}

export default function optionsReducer(state = initialState, action) {
  let allFilters;
  switch (action.type) {
    case REQUEST_QUESTION_OPTIONS:
        return {...state, isFetching: true};
    case GET_QUESTION_OPTIONS:
        return {...state, isFetching: false, options: action.options, failed: false,};
    case CHANGE_OPTION_TITLE:
        let newOptions = [...state.options];
        newOptions[action.payload.optionOrder] = {
          ...newOptions[action.payload.optionOrder],
          title: action.payload.title
        };
        return {...state, options: newOptions}
      case DRAG_OPTION_CARD:
        let options = state.options;
        const draggedOption = options[action.dragIndex];
        const swapOptions = options[action.hoverIndex];
        options[action.hoverIndex] = draggedOption;
        options[action.dragIndex] = swapOptions;
        return {...state, options: [...options]};
    case OPTION_FETCH_FAILED:
      return {...state, failed: true}
    case STORE_OPTIONS: {
      const allOptions = {...state.allOptions};
      allOptions[action.payload.questionId] = action.payload.options
      return {...state, isFetching: false, failed: false, allOptions: allOptions}
    }
    case STORE_OPTIONS_FILTERS:
      allFilters = Object.assign({}, state.optionsFilters, action.filters);
      return {...state, optionsFilters: allFilters}
    case SWITCH_FILTER:
      let questions = state.optionsFilters[action.payload.optionId];
      if(action.payload.checked) {
        let index = lodash.indexOf(questions, action.payload.questionId)
        questions = [
          ...questions.slice(0, index),
          ...questions.slice(index + 1)
        ]
      } else {
        questions = [...questions, action.payload.questionId]
      }
      allFilters = state.optionsFilters;
      allFilters[action.payload.optionId] = [...questions];
      return {...state, optionsFilters: Object.assign({}, allFilters)}
    default:
      return state;
  }
}
