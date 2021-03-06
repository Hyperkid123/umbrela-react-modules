import {
  GET_RESEARCH_SHEETS,
  REQUEST_SHEETS,
  RECEIVE_NEW_SHEET,
  SELECT_EDITOR_SHEET,
  DESELECT_ACTIVE_SHEET,
  CHANGE_SHEET_TITLE,
  DRAG_SHEET_CARD,
  RESEARCH_FETCH_FAILED
} from './actionTypes';

import {sheetInfoValidator} from '../../common/validator';
import {dragEnd, finishFetch, fetchFailed} from './';
import lodash from 'lodash';
import {
  getSheetsRequest,
  newSheetRequest,
  deleteSheetRequest,
  updateSheetRequest,
  remapSheetsRequest,
} from './endpoints';

const researchId = window.researchId;

export function getSheets(researchId){
  return dispatch => {
    dispatch(requestSheets());
    return getSheetsRequest(researchId)
    .then(response => response.json())
    .then(json => dispatch(receiveSheets(json)))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(RESEARCH_FETCH_FAILED))
    });
  }
}

function receiveSheets(sheets) {
  return {
    type: GET_RESEARCH_SHEETS,
    sheets,
  };
}

function requestSheets() {
  return {
    type: REQUEST_SHEETS
  }
}

export function createNewSheet(sheetTitle) {
  return dispatch => {
    dispatch(requestSheets());
    return newSheetRequest(sheetTitle, researchId)
    .then(response => response.json())
    .then((json) => {
      dispatch(getSheets(researchId)).then(() => {
        dispatch(receiveNewSheet(json.sheetId))
      })
    })
    .then(() => dispatch(finishFetch()))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(RESEARCH_FETCH_FAILED))
    });
  }
}

function receiveNewSheet(sheetId) {
  return {
    type: RECEIVE_NEW_SHEET,
    sheetId,
  }
}

export function selectEditorSheet(sheetId) {
  return {
    type: SELECT_EDITOR_SHEET,
    sheetId,
  }
}

export function deleteSheet(sheetId, researchId) {
  return dispatch => {
    dispatch(requestSheets());
    return deleteSheetRequest(sheetId, researchId)
    .then(response => response.json())
    .then((json) => {
      dispatch(deselectSheet(researchId))
    }).then(() => {
      dispatch(getSheets(researchId))
    })
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(RESEARCH_FETCH_FAILED))
    });
  }
}

function deselectSheet() {
  return {
    type: DESELECT_ACTIVE_SHEET,
  }
}

export function changeSheetTitle(title) {
  return {
    type: CHANGE_SHEET_TITLE,
    title,
  }
}

export function updateSheetInformation(sheet, researchId) {
  return (dispatch, getState) => {
    let originalSheet = lodash.find(getState().editor.sheets, (item) => {
      return item.sheetId === sheet.sheetId;
    });
    if(originalSheet && sheet.title !== originalSheet.title && sheetInfoValidator(sheet)){
      dispatch(requestSheets());
      return updateSheetRequest(sheet)
      .then(response => response.json())
      .then((json) => {
        dispatch(getSheets(researchId))
      })
      .catch((err) => {
        console.log('failed to fetch: ', err);
        dispatch(fetchFailed(RESEARCH_FETCH_FAILED))
      });
    }
  }
}

export function dragSheetCard(dragIndex, hoverIndex) {
  return {
    type: DRAG_SHEET_CARD,
    dragIndex,
    hoverIndex
  }
}

export function remapSheets(researchId) {
  return (dispatch, getState) => {
    dispatch(requestSheets());
    return remapSheetsRequest(getState().editor.sheets, researchId)
    .then(response => response.json())
    .then((json) => {
      dispatch(getSheets(researchId));
      dispatch(dragEnd());
    })
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(RESEARCH_FETCH_FAILED))
    });
  }
}
