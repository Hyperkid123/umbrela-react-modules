import {
  LABEL_LENGTH
} from './constants';

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
