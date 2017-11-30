import {
  REQUEST_QUESTION,
  GET_SHEET_QUESTIONS,
} from './actionTypes';

function requestQuestions(){
  return {
    type:REQUEST_QUESTION
  }
}

function receiveQuestions(questions) {
  return {
    type: GET_SHEET_QUESTIONS,
    questions,
  };
}

function getQuestions(sheetId){
  return dispatch => {
    dispatch(requestQuestions());
    return fetch(`${window.base}${window.researchId}/get-questions`, {
      method: 'POST',
      body: JSON.stringify({sheetId}),
    }).then(response => response.json())
    .then(json => dispatch(receiveQuestions(json)))
    .catch((err) => {console.log('failed to fetch: ', err);});
  }
}
