import {
  GET_QUESTION_OPTIONS,
  REQUEST_QUESTION_OPTIONS,
  CHANGE_OPTION_TITLE,
  DRAG_OPTION_CARD,
  OPTION_FETCH_FAILED,
  STORE_OPTIONS,
  STORE_OPTIONS_FILTERS,
  SWITCH_FILTER
} from './actionTypes';

import {dragEnd, fetchFailed} from './';

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
    .catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    });
  }
}

function storeOptions(options, questionId) {
  return {
    type: STORE_OPTIONS,
    payload: {
      options,
      questionId,
    }
  }
}

function getOptionsFilters(options) {
  return dispatch => {
    return fetch(`${window.base}${window.researchId}/get-question-options-filters`, {
      method: 'POST',
      body: JSON.stringify({options})
    })
    .then(response => response.json())
    .then(json => dispatch(storeOptionsFilter(json.filters)))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    });
  }
}

function storeOptionsFilter(filters) {
  return {
    type: STORE_OPTIONS_FILTERS,
    filters
  }
}

export function loadOptions(questionId) {
  return dispatch => {
    dispatch(requestOptions());
    return fetch(`${window.base}${window.researchId}/get-question-options`, {
      method: 'POST',
      body: JSON.stringify({questionId}),
    }).then(response => response.json())
    .then(json => dispatch(storeOptions(json.options, questionId)))
    .then(action => {
      dispatch(getOptionsFilters(action.payload.options))
    })
    .catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    });
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
    }).catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    })
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

export function dragOptionCard(dragIndex, hoverIndex) {
  return {
    type: DRAG_OPTION_CARD,
    dragIndex,
    hoverIndex
  }
}

export function remapOptions(questionId) {
  return (dispatch, getState) => {
    const {editor, options} = getState();
    dispatch(requestOptions());
    return fetch(`${window.base}${editor.researchId}/remap-options`, {
      method: 'POST',
      body: JSON.stringify({
        questionId,
        options: options.options
      }),
    }).then(response => response.json())
    .then((json) => {
      dispatch(getOptions(questionId));
      dispatch(dragEnd());
    })
    .catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    });
  }
}

export function deleteOption(option) {
  return (dispatch, getState) => {
    const {editor, questions} = getState();
    dispatch(requestOptions());
    return fetch(`${window.base}${editor.researchId}/delete-option`, {
      method: 'POST',
      body: JSON.stringify({
        option
      }),
    }).then(() => dispatch(getOptions(questions.activeQuestion.questionId)))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      fetchFailed(OPTION_FETCH_FAILED)
    });
  }
}

export function saveFilter(optionId, questionId, checked) {
  return (dispatch, getState) => {
    const {editor} = getState();
    return fetch(`${window.base}${editor.researchId}/save-filter`, {
      method: 'POST',
      body: JSON.stringify({
        filterType: 'hide_question',
        optionId,
        questionId,
        checked
      }),
    }).then(() => dispatch(switchFilter(optionId, questionId, checked)))
  }
}

function switchFilter(optionId, questionId, checked) {
  return {
    type: SWITCH_FILTER,
    payload: {
      optionId,
      questionId,
      checked,
    }
  }
}
