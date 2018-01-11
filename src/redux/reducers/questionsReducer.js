import {
  REQUEST_QUESTION,
  GET_SHEET_QUESTIONS,
  RECEIVE_NEW_QUESTION,
  SELECT_EDITOR_QUESTION,
  SYNCHORNIZE_ACTIVE_QUESTION,
  CHANGE_QUESTION_TITLE,
  DRAG_QUESTION_CARD,
  CHANGE_MANDATORY_QUESTION,
  CHANGE_CUSTOM_HELP,
  SET_CUSTOM_HELP,
  CHANGE_QUESTION_TYPE,
  CHANGE_QUESTION_IMAGE_URL,
  FINISH_FETCH,
  DESELECT_QUESTION,
  CHANGE_SCALE_POINTS,
} from '../actions/actionTypes';

import lodash from 'lodash';

const initialState = {
  questions: null,
  activeQuestion: null,
  isFetching: false,
  newQuestion: false,
}

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCALE_POINTS:
      return {...state, activeQuestion: {...state.activeQuestion, scalePoints: action.scalePoints, newQuestion: false}};
    case DESELECT_QUESTION:
      return {...state, activeQuestion: null}
    case FINISH_FETCH:
      return {...state, isFetching: false}
    case REQUEST_QUESTION:
      return {...state, isFetching: true}
    case GET_SHEET_QUESTIONS:
      return {...state, questions: action.questions}
    case RECEIVE_NEW_QUESTION:
      const activeQuestion = lodash.find(state.questions, (question) => {
        return question.questionId === action.questionId;
      });
      return {...state, isFetching: false, activeQuestion: {...activeQuestion, newQuestion: true}}
    case SELECT_EDITOR_QUESTION:
      const selected = lodash.find(state.questions, (question) => {
        return question.questionId === action.questionId;
      });
      return {...state, isFetching: false, activeQuestion: selected}
    case SYNCHORNIZE_ACTIVE_QUESTION:
      return {...state, activeQuestion: action.question, isFetching: false}
    case CHANGE_QUESTION_TITLE:
      return {...state, activeQuestion: {...state.activeQuestion, title: action.title, newQuestion: false}};
    case DRAG_QUESTION_CARD:
      let questions = state.questions;
      const draggedQuestion = questions[action.dragIndex];
      const swapQuestion = questions[action.hoverIndex];
      questions[action.hoverIndex] = draggedQuestion;
      questions[action.dragIndex] = swapQuestion;
      return {...state, questions: [...questions]};
    case CHANGE_MANDATORY_QUESTION:
      return {...state, activeQuestion: {...state.activeQuestion, mandatory: action.mandatory}}
    case CHANGE_CUSTOM_HELP:
      return {...state, activeQuestion: {...state.activeQuestion, customHelp: action.customHelp}}
    case SET_CUSTOM_HELP:
      return {...state, activeQuestion: {
        ...state.activeQuestion,
        hasCustomHelp: action.hasCustomHelp,
        customHelp: state.activeQuestion.customHelp || '(Zadejte vlastní nápovědu)'}
      }
    case CHANGE_QUESTION_TYPE:
      return {...state, activeQuestion: {...state.activeQuestion, questionType: action.questionType}};
    case CHANGE_QUESTION_IMAGE_URL:
      return {...state, activeQuestion: {...state.activeQuestion, url: action.url}};
    default:
      return state;
  }
}
