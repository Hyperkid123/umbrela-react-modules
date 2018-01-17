import {HasOpenQuestion} from './questionTypes';
import lodash from 'lodash';
import {HasMultipleAnswers} from './questionTypes';


export const getNewOptionOrder = (options, questionType) => {
  if(HasOpenQuestion(questionType)) {
    return options.length - 1;
  } else {
    return options.length;
  }
}

export const findOpenOption = (options) => {
  return lodash.find(options, (option) => {
    return option.optionType === 'OpenOption';
  });
}

export const getOptionsInputType = (questionType) => {
  return HasMultipleAnswers(questionType) ? 'checkBox' : 'redioButton'
}

export const divideMatrixOptions = (options) => {
  const rows = [];
  const columns = [];
  options.map((option) => {
    if(option.optionType === 'ColumnOption') columns.push(option);
    if(option.optionType === 'RowOption') rows.push(option);
  });

  return {rows, columns};
}
