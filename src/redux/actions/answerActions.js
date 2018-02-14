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
  RESET_ANSWERS
} from './actionTypes'

export function answerCloseOpenQuestion(questionId, optionId, answer) {
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
