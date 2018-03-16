import {
  GET_RESEARCH_SHEETS,
  REQUEST_SHEETS,
  RECEIVE_NEW_SHEET,
  SELECT_EDITOR_SHEET,
  DESELECT_ACTIVE_SHEET,
  CHANGE_SHEET_TITLE,
  DRAG_SHEET_CARD,
  RESEARCH_FETCH_FAILED,
} from '../actions/actionTypes';
import lodash from 'lodash';


const initialState = {
  sheets: null,
  isFetching: false,
  activeSheet: null,
  researchId: window.researchId,
  failed: false,
}
function researchEditorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESEARCH_SHEETS:
      return {...state, sheets: action.sheets, isFetching: false, failed: false};
    case REQUEST_SHEETS:
      return {...state, isFetching: true};
    case RECEIVE_NEW_SHEET:
      const newSheetIndex = lodash.findIndex(state.sheets, (sheet) => {
        return sheet.sheetId === action.sheetId;
      });
      return {...state, isFetching: false, activeSheet: {...state.sheets[newSheetIndex], newSheet: true}, failed: false,}
    case SELECT_EDITOR_SHEET:
      const activeSheetIndex = lodash.findIndex(state.sheets, (sheet) => {
        return sheet.sheetId === action.sheetId;
      });
      return {...state, isFetching: false, activeSheet: state.sheets[activeSheetIndex], failed: false,}
    case DESELECT_ACTIVE_SHEET:
      return {...state, activeSheet: null}
    case CHANGE_SHEET_TITLE:
      return {...state, activeSheet: {...state.activeSheet, title: action.title, newSheet: false}}
    case DRAG_SHEET_CARD:
      let sheets = state.sheets;
      const draggedSheet = sheets[action.dragIndex];
      const swapSheet = sheets[action.hoverIndex];
      sheets[action.hoverIndex] = draggedSheet;
      sheets[action.dragIndex] = swapSheet;
      return {...state, sheets: [...sheets]};
    case RESEARCH_FETCH_FAILED:
      return {...state, failed: true}
    default:
      return state;
  }
}
export default researchEditorReducer;
