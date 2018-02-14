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
} from '../actions/actionTypes'

const answers = {};

export default function (state = answers, action) {
    switch (action.type) {
        case CLOSE_OPEN_QUESTION_ANSWER : {
            if (action.payload.answer.length > 0) {
                let options = [];
                let question = state[action.payload.questionId];
                if (question) {
                    if (state[action.payload.questionId].options) options = state[action.payload.questionId].options;
                }
                question  = {...state[action.payload.questionId],
                    options: options,
                    openAnswer: action.payload.answer,
                    optionId: action.payload.optionId,
                };
                return {...state, [action.payload.questionId]: question};
            }else{
                let question = state[action.payload.questionId];
                if (question.options.length === 0) {
                    delete question.options;
                }else {
                    question = {...question, openAnswer: null, optionId: null};
                }
                return {...state, [action.payload.questionId]: question};
            }
        }
        case CLOSE_QUESTION_ANSWER: {
            let question = state[action.payload.questionId];
            question = {...question, openAnswer: '', optionId: action.payload.optionId};
            return {...state, [action.payload.questionId]: question};
        }
        case CLOSE_MULTI_ANSWER: {
            if (!action.payload.checked) {
                const question = {...state[action.payload.questionId],
                    options: removeSingleOption(state[action.payload.questionId].options, action.payload.optionId),
                };
                if(question.options.length === 0 && !question.optionId){
                    const answers = {...state};
                    delete answers[action.payload.questionId];
                    return answers;
                }
                return {...state, [action.payload.questionId]: question};
            }
            if (state[action.payload.questionId]) {
                let question = state[action.payload.questionId];
                const options = [...question.options, action.payload.optionId];
                question = {...question, options: options};
                return {...state, [action.payload.questionId]: question};
            } else {
                const question = {
                    openAnswer: '',
                    options: [action.payload.optionId],
                };
                return {...state, [action.payload.questionId]: question};
            }
        }
        case OPEN_QUESTION_ANSWER: {
            if (action.payload.answer.length > 0) return {...state, [action.payload.questionId]:  action.payload.answer};
            else {
                const answers = {...state};
                delete answers[action.payload.questionId];
                return answers;
            }
        }
        case DIVIDE_QUESTION_ANSWER: {
            if (state[action.payload.questionId]) {
                const scales = [...state[action.payload.questionId]];
                scales[action.payload.index] = action.payload.scalePoints;
                return {...state, [action.payload.questionId]: scales};
            } else {
                const scales = Array.apply(null, Array(action.payload.size)).map(() => {
                    return 0;
                });
                scales[action.payload.index] = action.payload.scalePoints;
                return {...state, [action.payload.questionId]: scales};
            }
        }
        case DRAG_CARD: {
            let options = action.payload.options;
            const draggedOption = action.payload.options[action.payload.dragIndex];
            const swapOption = action.payload.options[action.payload.hoverIndex];
            options[action.payload.hoverIndex] = draggedOption;
            options[action.payload.dragIndex] = swapOption;
            return {...state, [action.payload.questionId]: [...options]};
        }
        case CREATE_CARDS: {
            return {...state, [action.payload.questionId]: action.payload.options};
        }
        case MATRIX_SINGLE_ANSWER: {
            if (state[action.payload.questionId]) {
                let rows = state[action.payload.questionId];
                if (!rows[action.payload.rowId]) {
                    rows = {...rows, [action.payload.rowId]: [action.payload.columnId]};
                } else {
                    const row = updateSingleRow(action.payload.columnId);
                    rows = {...rows, [action.payload.rowId]: row};
                }
                return {...state, [action.payload.questionId]: rows};
            } else {
                const row = {
                    [action.payload.rowId]: [action.payload.columnId],
                };
                return {...state, [action.payload.questionId]: row};
            }
        }
        case MATRIX_MULTI_ANSWER: {
            if (state[action.payload.questionId]) {
                let rows = state[action.payload.questionId];
                if (!rows[action.payload.rowId]) {
                    rows = {...rows, [action.payload.rowId]: [action.payload.columnId]};
                } else {
                    let row = rows[action.payload.rowId];
                    row = updateMultiRow(row, action.payload.columnId, action.payload.checked);
                    rows = {...rows, [action.payload.rowId]: row};
                }
                return {...state, [action.payload.questionId]: rows};
            } else {
                const row = {
                    [action.payload.rowId]: [action.payload.columnId],
                };
                return {...state, [action.payload.questionId]: row};
            }
        }
        case RESET_ANSWERS:
            return {};
        default:
            return state;
    }
}

function removeSingleOption(options, option) {
    let optionIndex = 0;
    options.map((item, index) => {
        if (option === item) optionIndex = index;
    });
    return [
        ...options.slice(0, optionIndex),
        ...options.slice(optionIndex + 1),
    ];
}

function updateMultiRow(row, columnId, checked) {
    if (!checked) {
        const index = findColumnIndex(row, columnId);
        return [
            ...row.slice(0, index),
            ...row.slice(index + 1),
        ];
    }
    return [...row, columnId];
}

function updateSingleRow(columnId) {
    return [columnId];
}

function findColumnIndex(row, columnId) {
    let result = false;
    row.map((item, i) => {
        if (columnId === item) result = i;
    });
    return result;
}
