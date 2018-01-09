import {HasOpenQuestion} from './questionTypes';

export const getNewOptionOrder = (options, questionType) => {
  if(HasOpenQuestion(questionType)) {
    return options.length - 1;
  } else {
    return options.length;
  }
}
