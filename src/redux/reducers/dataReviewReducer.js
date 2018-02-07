import {
  REQUEST_QUESTION,
  RECEIVE_QUESTION_ANSWERS,
  INVALIDATE_QUESTION,
} from '../actions/';

import {
  createChartData,
  getRespondents,
  divideMatrixData,
  createDivideData,
} from '../../common/utils';

export default function(
  state = {
    isFetching:false,
    didInvalidate:false,
    questions:{},
    questionData: new Map(),
    question: null,
  },
    action){
  switch (action.type) {
    case INVALIDATE_QUESTION:
      return Object.assign({}, state, {didInvalidate: true});
    case REQUEST_QUESTION:
      return Object.assign({}, state, {
          isFetching: true,
          didInvalidate: false,
      });
    case 'RECEIVE_QUESTION_ANSWERS':{
      const receivedQuestion = action.question[0];
      if(receivedQuestion.type.toLowerCase().includes('close')
      || receivedQuestion.type.toLowerCase().includes('imageoptions')
      || receivedQuestion.type.toLowerCase().includes('media')){
        const barData = createChartData(receivedQuestion.options, receivedQuestion.answers, receivedQuestion.type, true);
        const respondents = getRespondents(receivedQuestion.answers, receivedQuestion.type);
        const data = {
          barData,
          respondents,
          answerCount: barData.data.datasets[0].data.reduce(add, 0),
        };
        const newQuestionData = new Map(state.questionData);
        newQuestionData.set(receivedQuestion.questionId, data);
        const newQuestions = Object.assign({}, state.questions,);
        newQuestions[receivedQuestion.questionId] = receivedQuestion;
        return Object.assign({},
                state, {
                  isFetching: false,
                  didInvalidate: false,
                  lastUpdated: action.receivedAt,
                  questionData: newQuestionData,
                  questions: newQuestions,
                  question: receivedQuestion,
                }
              );
      }
      if(receivedQuestion.type.toLowerCase() === ('openquestion')
      || receivedQuestion.type.toLowerCase().includes('openwithimagequestion')){
        const data = {
          respondents: getRespondents(receivedQuestion.answers, receivedQuestion.type),
          answers: receivedQuestion.answers,
          answerCount: receivedQuestion.answers.length,
        };
        const newQuestionData = new Map(state.questionData);
        newQuestionData.set(receivedQuestion.questionId, data);
        const newQuestions = Object.assign({}, state.questions,);
        newQuestions[receivedQuestion.questionId] = receivedQuestion;
        return Object.assign({},
                state, {
                  isFetching: false,
                  didInvalidate: false,
                  lastUpdated: action.receivedAt,
                  questionData: newQuestionData,
                  questions: newQuestions,
                  question: receivedQuestion,
                }
              );
      }
      if(receivedQuestion.type.toLowerCase().includes('matrix')){
        const dividedData = divideMatrixData(receivedQuestion.options, receivedQuestion.answers, receivedQuestion.type);
        const data = {
          dividedData,
        };
        const newQuestionData = new Map(state.questionData);
        newQuestionData.set(receivedQuestion.questionId, data);
        const newQuestions = Object.assign({}, state.questions,);
        newQuestions[receivedQuestion.questionId] = receivedQuestion;
        return Object.assign({},
                state, {
                  isFetching: false,
                  didInvalidate: false,
                  lastUpdated: action.receivedAt,
                  questionData: newQuestionData,
                  questions: newQuestions,
                  question: receivedQuestion,
                }
              );
      }
      if(receivedQuestion.type.toLowerCase().includes('order') || receivedQuestion.type.toLowerCase().includes('divide')){
        const data = {
          data: createDivideData(receivedQuestion.options, receivedQuestion.answers, receivedQuestion.type),
          respondents: getRespondents(receivedQuestion.answers, receivedQuestion.type),
          answerCount: receivedQuestion.answers.length,
        };
        const newQuestionData = new Map(state.questionData);
        newQuestionData.set(receivedQuestion.questionId, data);
        const newQuestions = Object.assign({}, state.questions,);
        newQuestions[receivedQuestion.questionId] = receivedQuestion;
        return Object.assign({},
                state, {
                  isFetching: false,
                  didInvalidate: false,
                  lastUpdated: action.receivedAt,
                  questionData: newQuestionData,
                  questions: newQuestions,
                  question: receivedQuestion,
                }
              );
      }
      return Object.assign({},
        state,
        { isFetching: false, didInvalidate: false, question: receivedQuestion, lastUpdated: action.receivedAt});
      }
    default:
      return state;

  }
}

function add(a, b) {
  return a + b;
}
