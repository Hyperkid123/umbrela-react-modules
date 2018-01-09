import {
  GET_QUESTION_OPTIONS,
  REQUEST_QUESTION_OPTIONS,
  CHANGE_OPTION_TITLE,
} from './actionTypes';

function requestOptions(){
  return {
    type:REQUEST_QUESTION_OPTIONS
  }
}

function receiveOptions(options) {
  return {
    type: GET_QUESTION_OPTIONS,
    options,
  };
}

export function getOptions(questionId){
  return dispatch => {
    dispatch(requestOptions());
    return fetch(`${window.base}${window.researchId}/get-question-options`, {
      method: 'POST',
      body: JSON.stringify({questionId}),
    }).then(response => response.json())
    .then(json => dispatch(receiveOptions(json.options)))
    .catch((err) => {console.log('failed to fetch: ', err);});
  }
}

export function synchronizeOption(option) {
  return dispatch => {
    dispatch(requestOptions());
    return fetch(`${window.base}${window.researchId}/synchronize-option`, {
      method: 'POST',
      body: JSON.stringify({option}),
    }).then(() => {
      dispatch(getOptions(option.questionId));
    }).catch((err) => {console.log('failed to fetch: ', err);})
  }
}

export function changeOptionTitle(title, optionOrder){
  return{
    type:
    CHANGE_OPTION_TITLE,
    payload: {
      title,
      optionOrder
    }
  }
}
