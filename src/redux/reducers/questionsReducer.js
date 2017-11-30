import {
  REQUEST_QUESTION,
  GET_SHEET_QUESTIONS,
  RECEIVE_NEW_QUESTION,
  SELECT_EDITOR_QUESTION,
  SYNCHORNIZE_ACTIVE_QUESTION,
  CHANGE_QUESTION_TITLE,
} from '../actions/actionTypes';

import lodash from 'lodash';

const initialState = {
  questions: null,
  activeQuestion: null,
  isFeting: false,
  newQuestion: false,
}

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
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
      return {...state, activeQuestion: action.question}
    case CHANGE_QUESTION_TITLE:
      return {...state, activeQuestion: {...state.activeQuestion, title: action.title, newQuestion: false}};
    default:
      return state;
  }
}
