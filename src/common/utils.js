import {HasOpenQuestion} from './questionTypes';
import lodash from 'lodash';

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
