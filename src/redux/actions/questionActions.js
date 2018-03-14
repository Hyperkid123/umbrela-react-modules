import {
  REQUEST_QUESTION,
  GET_SHEET_QUESTIONS,
  SELECT_EDITOR_QUESTION,
  SYNCHORNIZE_ACTIVE_QUESTION,
  DESELECT_QUESTION,
  CHANGE_QUESTION_TITLE,
  DRAG_QUESTION_CARD,
  CHANGE_MANDATORY_QUESTION,
  CHANGE_CUSTOM_HELP,
  SET_CUSTOM_HELP,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_IMAGE_URL,
  CHANGE_SCALE_POINTS,
  QUESTION_FETCH_FAILED,
  STORE_QUESTIONS,
  RECEIVE_QUESTION_ANSWERS
} from './actionTypes';
import {HasOpenQuestion} from '../../common/questionTypes';
import {findOpenOption} from '../../common/utils';
import {dragEnd} from './';
import {synchronizeOption, deleteOption, finishFetch, fetchFailed} from './';
import { getTranslate } from 'react-localize-redux';
import {
  getQuestionsRequest,
  createQuestionRequest,
  questionStructureRequest,
  deleteQuestionRequest,
  synchronizeQuestionRequest,
  remapQuestionsRequest,
  questionAnswersRequest
} from './endpoints';

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
    return getQuestionsRequest(sheetId)
    .then(response => response.json())
    .then(json => dispatch(receiveQuestions(json)))
    .then(() => dispatch(finishFetch()))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED))
    });
  }
}

function storeQuestions(questions, sheetId) {
  return {
    type: STORE_QUESTIONS,
    payload: {
      questions,
      sheetId,
    }
  }
}

export function loadQuestions(sheetId){
  return dispatch => {
    dispatch(requestQuestions());
    return  getQuestionsRequest(sheetId)
    .then(response => response.json())
    .then(json => dispatch(storeQuestions(json, sheetId)))
    .then(() => dispatch(finishFetch()))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED))
    });
  }
}

export function createNewQuestion(researchId, sheetId, questionType) {
  return (dispatch, getState) => {
    dispatch(requestQuestions());
    const locale = getState().locale;
    const translate = getTranslate(locale);
    const payload = {
      title: translate('questions.titlePlaceholder'),
      questionType: questionType,
      sheetId: sheetId,
    };
    return createQuestionRequest(payload)
    .then(response => response.json())
    .then((json) => {
      dispatch(getQuestions(sheetId))
      return json
    })
    .then((json) => dispatch(getQuestionStructure(json.questionId)))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED))
    });
  }
}

export function selectEditorQuestion(questionId) {
  return {
    type: SELECT_EDITOR_QUESTION,
    questionId,
  }
}

export function getQuestionStructure(questionId) {
  return dispatch => {
    dispatch(requestQuestions());
    return questionStructureRequest(questionId)
    .then(response => response.json())
    .then((json) => dispatch(synchronizeActiveQuestion(json.question)))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED))
    });
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
    return deleteQuestionRequest(questionId)
    .then(response => response.json())
    .then((json) => {
      dispatch(getQuestions(editor.activeSheet.sheetId))
    })
    .then(() => dispatch(deselectQuestion()))
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED));
    });
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
    const {editor} = getState();
      dispatch(requestQuestions());
      return synchronizeQuestionRequest(question)
      .then(response => response.json())
      .then((json) => {
        dispatch(synchronizeActiveQuestion(json));
      })
      .then(() => dispatch(getQuestions(editor.activeSheet.sheetId)))
      .then(() => dispatch(finishFetch()))
      .catch((err) => {
        console.log('failed to fetch: ', err);
        dispatch(fetchFailed(QUESTION_FETCH_FAILED))
      });
  }
}

export function dragQuestionCard(dragIndex, hoverIndex) {
  return {
    type: DRAG_QUESTION_CARD,
    dragIndex,
    hoverIndex
  }
}

export function remapQuestions(sheetId) {
  return (dispatch, getState) => {
    const {questions} = getState();
    dispatch(requestQuestions());
    return remapQuestionsRequest(sheetId, questions.questions)
    .then(response => response.json())
    .then((json) => {
      dispatch(getQuestions(sheetId));
      dispatch(dragEnd());
    })
    .catch((err) => {
      console.log('failed to fetch: ', err);
      dispatch(fetchFailed(QUESTION_FETCH_FAILED))
    });
  }
}

export function changeMandatoryQuestion(mandatory) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_MANDATORY_QUESTION,
      mandatory
    });
    dispatch(updateQuetionsInformation(getState().questions.activeQuestion));
  }
}

export function changeCustomHelp(customHelp){
  return {
      type: CHANGE_CUSTOM_HELP,
      customHelp
  }
}

export function setCustomHelp(hasCustomHelp){
  return (dispatch, getState) => {
    dispatch({
      type: SET_CUSTOM_HELP,
      hasCustomHelp
    });
    dispatch(updateQuetionsInformation(getState().questions.activeQuestion));
  }
}

export function changeQuestionType(questionType) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_QUESTION_TYPE,
      questionType
    });
    dispatch(updateQuetionsInformation(getState().questions.activeQuestion))
    .then(() => {
      const activeQuestion = getState().questions.activeQuestion;
      const openOption = findOpenOption(activeQuestion.options)
      if(HasOpenQuestion(questionType) && !openOption) {
        const locale = getState().locale;
        const translate = getTranslate(locale);
        const newOption = {
          title: translate('questions.customAnswer'),
          optionOrder: activeQuestion.options.length,
          optionType: 'OpenOption',
          questionId: activeQuestion.questionId,
          new: true,
        }
        dispatch(synchronizeOption(newOption));
      } else if(!HasOpenQuestion(questionType) && openOption) {
        dispatch(deleteOption(openOption));
      }
    }).then(() => dispatch(finishFetch()))
  }
}

export function chnageQuestionUrl(url) {
  return {
    type: CHANGE_QUESTION_IMAGE_URL,
    url,
  }
}

export function changeScalePoints(scalePoints) {
  return {
    type: CHANGE_SCALE_POINTS,
    scalePoints,
  }
}


function requestQuestion(questionId){
  return{
    type: REQUEST_QUESTION,
    questionId,
  };
}

function receiveQuestion(questionId, json){
  return{
    type: RECEIVE_QUESTION_ANSWERS,
    questionId,
    question: json,
    receivedAt: Date.now(),
  };
}

function fetchQuestion(questionId) {
  return dispatch => {
    dispatch(requestQuestion(questionId));
    return questionAnswersRequest(questionId)
    .then(response => response.json())
    .then(json => dispatch(receiveQuestion(questionId, json)));
  };
}

function shouldFetchQuestion(state, questionId) {
  const question = state.data.questionData.has(parseInt(questionId, 10));
  const isFetching = state.data.questionData.isFetching;
  if(question || isFetching){
    return false;
  }
  return true;
}

export function fetchQuestionIfNeeded(questionId) {
  return (dispatch, getState) => {
    if(shouldFetchQuestion(getState(), questionId)) {
      return dispatch(fetchQuestion(questionId));
    }
  };
}
