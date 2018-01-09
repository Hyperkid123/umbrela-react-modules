import {TEST_ACTION} from './actionTypes';
export {
  getSheets,
  createNewSheet,
  selectEditorSheet,
  deleteSheet,
  changeSheetTitle,
  updateSheetInformation,
  dragSheetCard,
  remapSheets,
} from './researchActions';

export {
  getQuestions,
  createNewQuestion,
  selectEditorQuestion,
  getQuestionStructure,
  deleteQuestion,
  changeQuestionTitle,
  updateQuetionsInformation,
  dragQuestionCard,
  remapQuestions,
  changeMandatoryQuestion,
  changeCustomHelp,
  setCustomHelp,
  changeQuestionType,
  chnageQuestionUrl,
} from './questionActions';

export {
  getOptions,
  synchronizeOption,
  changeOptionTitle,
  dragOptionCard,
  remapOptions,
  deleteOption,
} from './optionsActions';

export {
  dragEnd
} from './uiActions';

export function testAction(){
  return {
    type:TEST_ACTION,
  }
}
