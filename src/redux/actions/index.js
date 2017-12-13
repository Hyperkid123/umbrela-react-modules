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
  remapQuestions
} from './questionActions';

export {
  dragEnd
} from './uiActions';

export function testAction(){
  return {
    type:TEST_ACTION,
  }
}
