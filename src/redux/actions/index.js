import {FINISH_FETCH} from './actionTypes';
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
  changeScalePoints,
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
  changeRowBlocks,
  addPyramidRow,
  removePyramidRow,
} from './qMethodActions';

export {
  dragEnd
} from './uiActions';

export function finishFetch() {
  return {
    type: FINISH_FETCH
  }
}

export function fetchFailed(type) {
  return {
    type
  }
}
