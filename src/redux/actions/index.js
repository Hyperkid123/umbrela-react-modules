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
  loadQuestions,
  fetchQuestionIfNeeded,
} from './questionActions';

export {
  getOptions,
  synchronizeOption,
  changeOptionTitle,
  dragOptionCard,
  remapOptions,
  deleteOption,
  loadOptions,
  saveFilter
} from './optionsActions';

export {
  changeRowBlocks,
  addPyramidRow,
  removePyramidRow,
  dropImages,
} from './qMethodActions';

export {
  dragEnd,
  hideQuestions,
  hideSheets,
  hideChartlegend,
  changeChartType
} from './uiActions';

export {
  getResearchStructure,
  startResearch,
  updateResearchState
} from './fillActions'

export {
  answerCloseOpenQuestion,
  answerOptionAnswer,
  answerMultiQuestion,
  answerOpenQuestion,
  answerDivideQuestion,
  dragCard,
  createCards,
  answerMatrixSingle,
  answerMatrixMulti,
  resetAnswers,
} from './answerActions'

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
