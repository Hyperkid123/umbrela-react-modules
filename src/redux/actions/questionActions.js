import {
  REQUEST_QUESTION,
  GET_SHEET_QUESTIONS,
  RECEIVE_NEW_QUESTION,
  SELECT_EDITOR_QUESTION,
  SYNCHORNIZE_ACTIVE_QUESTION,
  DESELECT_QUESTION,
  CHANGE_QUESTION_TITLE,
} from './actionTypes';

import lodash from 'lodash';

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

export function getQuestions(sheetId){
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



function receiveNewQuestion(questionId) {
  return {
    type: RECEIVE_NEW_QUESTION,
    questionId,
  }
}

export function createNewQuestion(researchId, sheetId, questionType) {
  return dispatch => {
    dispatch(requestQuestions());
    return fetch(`${window.base}${researchId}/create-question`, {
      method: 'POST',
      body: JSON.stringify({
        title: '(Prosím zadejte název otázky)',
        questionType: questionType,
        sheetId: sheetId,
      }),
    }).then(response => response.json())
    .then((json) => {
      dispatch(getQuestions(sheetId)).then(() => {
        dispatch(receiveNewQuestion(json.questionId))
      })
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
  }
}

export function selectEditorQuestion(questionId) {
  return {
    type: SELECT_EDITOR_QUESTION,
    questionId,
  }
}

export function getQuestionStructure(questionId) {
  return (dispatch, getState) => {
    dispatch(requestQuestions());
    const {editor} = getState();
    return fetch(`${window.base}${editor.researchId}/get-question-structure`, {
      method: 'POST',
      body: JSON.stringify({
        questionId
      }),
    }).then(response => response.json())
    .then((json) => dispatch(synchronizeActiveQuestion(json.question)))
    .catch((err) => {console.log('failed to fetch: ', err)});
  }
}

function synchronizeActiveQuestion(question) {
  return {
    type: SYNCHORNIZE_ACTIVE_QUESTION,
    question,
  }
}

export function deleteQuestion(questionId) {
  return (dispatch, getState) => {
    dispatch(requestQuestions());
    const {editor} = getState();
    return fetch(`${window.base}${editor.researchId}/delete-question`, {
      method: 'POST',
      body: JSON.stringify({questionId}),
    }).then(response => response.json())
    .then((json) => {
      dispatch(deselectQuestion())
    }).then(() => {
      dispatch(getQuestions(editor.activeSheet.sheetId))
    })
    .catch((err) => {console.log('failed to fetch: ', err)});
  }
}

function deselectQuestion() {
  return {
    type: DESELECT_QUESTION
  }
}

export function changeQuestionTitle(title) {
  return {
    type: CHANGE_QUESTION_TITLE,
    title,
  }
}

export function updateQuetionsInformation(question) {
  return (dispatch, getState) => {
    const {editor, questions} = getState();
    let originalQuestion = lodash.find(questions.questions, (item) => {
      return item.questionId === question.questionId;
    });
    console.log(
      'question: ', question
    );
    if(originalQuestion && question.title !== originalQuestion.title){
      dispatch(requestQuestions());
      return fetch(`${window.base}${editor.researchId}/synchronize-question`, {
        method: 'POST',
        body: JSON.stringify({question: {...question}}),
      }).then(response => response.json())
      .then((json) => {
        dispatch(getQuestions(editor.activeSheet.sheetId))
      })
      .catch((err) => {console.log('failed to fetch: ', err)});
    }
  }
}
