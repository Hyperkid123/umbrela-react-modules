import {
  DRAG_END,
  DRAG_SHEET_CARD,
} from '../actions/actionTypes';


const initialState = {
  dragging: false,
};


export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DRAG_SHEET_CARD:
      return {...state, dragging: true};
    case DRAG_END:
      return {...state, dragging: false}
    default:
      return state;

  }
}
