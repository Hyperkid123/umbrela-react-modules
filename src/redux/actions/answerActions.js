import {
  CLOSE_OPEN_QUESTION_ANSWER,
  CLOSE_QUESTION_ANSWER,
  CLOSE_MULTI_ANSWER,
  OPEN_QUESTION_ANSWER,
  DIVIDE_QUESTION_ANSWER,
  DRAG_CARD,
  CREATE_CARDS,
  MATRIX_SINGLE_ANSWER,
  MATRIX_MULTI_ANSWER,
  RESET_ANSWERS,
  SEND_ANSWERS,
  ANSWERS_SUBBMITED,
} from './actionTypes'

export function answerCloseOpenQuestion(questionId, optionId, answer = '') {
    return {
        type: CLOSE_OPEN_QUESTION_ANSWER,
        payload: {
            questionId: questionId,
            answer: answer,
            optionId: optionId,
        },
    };
}

export function answerOptionAnswer(questionId, optionId, checked) {
    return {
        type: CLOSE_QUESTION_ANSWER,
        payload: {
            questionId: questionId,
            optionId: optionId,
            checked: checked,
        },
    };
}

export function answerMultiQuestion(questionId, optionId, checked) {
    return {
        type: CLOSE_MULTI_ANSWER,
        payload: {
            questionId: questionId,
            optionId: optionId,
            checked: checked,
        },
    };
}

export function answerOpenQuestion(questionId, answer) {
    return{
        type: OPEN_QUESTION_ANSWER,
        payload: {
            questionId: questionId,
            answer: answer,
        },
    };
}

export function answerDivideQuestion(questionId, scalePoints, size, index) {
    return{
        type: DIVIDE_QUESTION_ANSWER,
        payload: {
            questionId: questionId,
            scalePoints: scalePoints,
            size: size,
            index: index,
        },
    };
}

export function dragCard(questionId, options, dragIndex, hoverIndex) {
    return {
        type: DRAG_CARD,
        payload: {
            questionId: questionId,
            options: options,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        },
    };
}
export function createCards(questionId, options) {
    return{
        type: CREATE_CARDS,
        payload:{
            questionId: questionId,
            options: options,
        },
    };
}

export function answerMatrixSingle(questionId, rowId, columnId, checked){
    return {
        type: MATRIX_SINGLE_ANSWER,
        payload: {
            questionId: questionId,
            rowId: rowId,
            columnId: columnId,
            checked: checked,
        },
    };
}
export function answerMatrixMulti(questionId, rowId, columnId, checked){
    return {
        type: MATRIX_MULTI_ANSWER,
        payload: {
            questionId: questionId,
            rowId: rowId,
            columnId: columnId,
            checked: checked,
        },
    };
}

export function resetAnswers(){
    return {
      type:RESET_ANSWERS
    };
}

function sendAnswers() {
  return {
    type: SEND_ANSWERS,
  }
}

function answersSubbmited() {
  return {
    type: ANSWERS_SUBBMITED,
  }
}

export function submitAnswers(answers) {
  return (dispatch, getState) => {
    dispatch(sendAnswers);
    const url = window.base + window.researchId + '/save-session';
    const {research} = getState();
    const payload = {
      answers,
      executionTime: (performance.now() - research.startTime)
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        redirect: 'manual',
        headers: {
            'Accept': 'application/json, text/plain',
        },
    }).then((response) => {
        if(!response.ok){
            throw new Error(response);
        }
        dispatch(resetAnswers())
    }).then(() => dispatch(answersSubbmited()))
    .catch((err) => {
      console.log('failed to submit answers: ', err);
    });
  }
}
