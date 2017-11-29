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
  dragEnd
} from './uiActions';

export function testAction(){
  return {
    type:TEST_ACTION,
  }
}
