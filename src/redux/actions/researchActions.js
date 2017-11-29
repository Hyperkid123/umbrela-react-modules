import {
  GET_RESEARCH_SHEETS,
  REQUEST_SHEETS,
  RECEIVE_NEW_SHEET,
  SELECT_EDITOR_SHEET,
  DESELECT_ACTIVE_SHEET,
  CHANGE_SHEET_TITLE,
  DRAG_SHEET_CARD,
} from './actionTypes';

import {dragEnd} from './';

export function getSheets(researchId){
  return dispatch => {
    dispatch(requestSheets());
    return fetch(`${window.base}${researchId}/get-sheets`, {
      method: 'POST',
    }).then(response => response.json())
    .then(json => dispatch(receiveSheets(json)))
    .catch((err) => {console.log('failed to fetch: ', err);});
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

export function createNewSheet(researchId) {
  return dispatch => {
    dispatch(requestSheets());
    return fetch(`${window.base}${researchId}/create-sheet`, {
      method: 'POST',
      body: JSON.stringify({title: '(Prosím zadejte název archu)'}),
    }).then(response => response.json())
    .then((json) => {
      dispatch(getSheets(researchId)).then(() => {
        dispatch(receiveNewSheet(json.sheetId))
      })
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
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
    return fetch(`${window.base}${researchId}/delete-sheet`, {
      method: 'POST',
      body: JSON.stringify({sheetId: sheetId}),
    }).then(response => response.json())
    .then((json) => {
      dispatch(deselectSheet(researchId))
    }).then(() => {
      dispatch(getSheets(researchId))
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
  }
}

export function deselectSheet() {
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
  return dispatch => {
    dispatch(requestSheets());
    return fetch(`${window.base}${researchId}/update-sheet`, {
      method: 'POST',
      body: JSON.stringify({sheet}),
    }).then(response => response.json())
    .then((json) => {
      dispatch(getSheets(researchId))
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
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
    return fetch(`${window.base}${researchId}/remap-sheets`, {
      method: 'POST',
      body: JSON.stringify({sheets: getState().editor.sheets}),
    }).then(response => response.json())
    .then((json) => {
      dispatch(getSheets(researchId));
      dispatch(dragEnd());
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
  }
}
