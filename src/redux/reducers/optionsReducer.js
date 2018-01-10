import {
  GET_QUESTION_OPTIONS,
  REQUEST_QUESTION_OPTIONS,
  CHANGE_OPTION_TITLE,
  DRAG_OPTION_CARD,
} from '../actions/actionTypes';

const initialState = {
  options: [],
  isFetching: false,
}

export default function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUESTION_OPTIONS:
        return {...state, isFetching: true};
    case GET_QUESTION_OPTIONS:
        return {...state, isFetching: false, options: action.options};
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
    default:
      return state;
  }
}
