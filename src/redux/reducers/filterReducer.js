import {
  CREATE_FILTER_STRUCTURE
} from '../actions/actionTypes'

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_FILTER_STRUCTURE: {
            const filters = {};
            const filteringOptions = {};
            const questionFilters = {};
            const sourceQuestionMap = {};
            action.research.sheets.forEach((sheet) => {
                sheet.questions.forEach((question) => {
                    const optionsIndexes = new Set();
                    question.filters.forEach((filter) => {
                        if(sourceQuestionMap[question.questionId]) {
                            sourceQuestionMap[question.questionId] = [...sourceQuestionMap[question.questionId], filter.questionId];
                        }else {
                            sourceQuestionMap[question.questionId] = [filter.questionId];
                        }
                        filters[filter.questionId] = [];
                        if (!filteringOptions[filter.optionId]) {
                            filteringOptions[filter.optionId] = [filter.questionId];
                        } else {
                            const questions = [...filteringOptions[filter.optionId], filter.questionId];
                            filteringOptions[filter.optionId] = questions;
                        }
                        optionsIndexes.add(filter.optionId);
                    });

                    if (question.filters.length > 0) {
                      // eslint-disable-next-line
                      questionFilters[question.questionId, Array.from(optionsIndexes)];
                    }
                });
            });
            return {
                filters,
                filteringOptions,
                questionFilters,
                sourceQuestionMap,
            };
        }
        case 'CLOSE_OPEN_QUESTION_ANSWER':
        case 'CLOSE_QUESTION_ANSWER': {
            const answer = action.payload.answer ? action.payload.answer : action.payload.checked;
            let source = state.sourceQuestionMap[action.payload.questionId];
            if (answer && state.filteringOptions[action.payload.optionId]) {
                source.forEach((targetId) => {
                    state.filters[targetId] = [];
                });
                emptyFilters(state.filters, state.filteringOptions, state.questionFilters[action.payload.questionId]);
                return {
                    ...state,
                    filters: addCloseFilter(action.payload.optionId, state.filters, state.filteringOptions),
                };
            } else {
                let newFilters = state.filters;
                if(source) {
                    source.forEach((targetId) => {
                        state.filters[targetId] = [];
                        newFilters = emptyFilters(state.filters, state, state.questionFilters[targetId]);
                    });
                }
                return {
                    ...state,
                    filters: newFilters,
                };
            }
        }
        case 'CLOSE_MULTI_ANSWER': {
            const answer = action.payload.answer ? action.payload.answer : action.payload.checked;
            if (answer && state.filteringOptions[action.payload.optionId]) {
                return {
                    ...state,
                    filters: addCloseFilter(action.payload.optionId, state.filters, state.filteringOptions),
                };
            }
            if (!answer && state.filteringOptions[action.payload.optionId]) {
                return {
                    ...state,
                    filters: removeFilteringOption(action.payload.optionId, state.filters, state.filteringOptions),
                };
            }
            return state;
        }
        default:
          return state
    }
}


function addCloseFilter(optionId, filters, filteringOptions) {
    const newFilters = {...filters};
    filteringOptions[optionId].forEach((question) => {
        if(filters[question]) {
            newFilters[question] =  [...filters[question], optionId];
        } else {
            newFilters[question] = [optionId];
        }

    });
    return newFilters;
}

function emptyFilters(filters, filteringOptions, questionFilters) {
    const newFilters = {...filters};
    if(questionFilters){
        questionFilters.forEach((optionId) => {
            filteringOptions[optionId].forEach((question) => {
                newFilters[question] = [];
            });
        });
    }
    return newFilters;
}

function removeFilteringOption(optionId, filters, filteringOptions) {
    const newFilters = {...filters};
    filteringOptions[optionId].forEach((question) => {
        newFilters[question] = removeFromArray(filters[question], optionId);
    });
    return newFilters;
}

function removeFromArray(array, item) {
    let index = false;
    array.forEach((entry, i) => {
        if (entry === item) index = i;
    });
    if (index || index === 0) {
        return [
            ...array.slice(0, index),
            ...array.slice(index + 1),
        ];
    }
    return array;
}
