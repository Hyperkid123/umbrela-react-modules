import {
  LABEL_LENGTH
} from './constants';

export function sheetInfoValidator(sheet) {
  return sheet.title.length <= LABEL_LENGTH && sheet.title.length > 0;
}
