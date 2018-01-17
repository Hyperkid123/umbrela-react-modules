import {
  LABEL_LENGTH
} from './constants';
import {HasOptionsAsImage} from './questionTypes';

export function sheetInfoValidator(sheet) {
  return sheet.title.length <= LABEL_LENGTH && sheet.title.length > 0;
}

export function validateUrl(url) {
  if (!url) return false;
  return isStringUrl(url)[0];
}

function isStringUrl(url) {
    let filteredUrl = url;
    if(url.indexOf('?') !== -1){
        filteredUrl = url.substring(0, url.indexOf('?'));
    }
    if(url.indexOf('#') !== -1){
        filteredUrl = filteredUrl.substring(0, url.indexOf('#'));
    }
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\.(jpeg|jpg|gif|png)$/;
    return [regexp.test(filteredUrl), filteredUrl];
}

export function ValideOption(optionText, questionType, optionType) {
  let valid = optionText.length > 0 && optionText.length <= LABEL_LENGTH;
  if(HasOptionsAsImage(questionType) && optionType !== 'ColumnOption') {
    valid = isStringUrl(optionText)[0];
  }
  return valid;
}

export function getOptionValidationMessage(optionText, questionType, optionType) {
  if(ValideOption(optionText, questionType, optionType)) {
    return ''
  }
  if(HasOptionsAsImage(questionType) && optionType !== 'ColumnOption') {
    return 'Zadaný řetězec není URL obrázku.'
  }
  if(optionText.length === 0) {
    return 'Vyplňte prosím text možnosti.'
  }
  if(optionText.length > LABEL_LENGTH) {
    return `Možnost může mít maxinálně 255 znaků (${optionText.length}).`;
  }
}
