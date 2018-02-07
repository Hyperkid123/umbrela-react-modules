export const PIE_CHART = 'PIE_CHART';
export const BAR_CHART = 'BAR_CHART';
export const POLAR_CHART = 'POLAR_CHART';
export const LINE_CHART = 'LINE_CHART';
export const DOUGHNUT_CHART = 'DOUGHNUT_CHART';

export const OPEN_QUESTION = 'OpenQuestion';
export const OPEN_WITH_IMAGE_QUESTIONS = 'OpenWithImageQuestion';

export const CLOSE_QUESTION = 'CloseQuestion';
export const CLOSE_MULTI_QUESTION = 'CloseMultiQuestion';
export const CLOSE_WITH_OPEN_QUESTION = 'CloseWithOpenQuestion';
export const CLOSE_MULTI_WITH_OPEN_QUESTION = 'CloseMultiWithOpenQuestion';

export const IMAGE_OPTIONS_QUESTION = 'ImageOptionsQuestion';
export const IMAGE_OPTIONS_MULTI_QUESTION = 'ImageOptionsMultiQuestion';
export const IMAGE_OPTIONS_WITH_OPEN_QUESTION = 'ImageOptionsWithOpenQuestion';
export const IMAGE_OPTIONS_MULTI_WITH_OPEN_QUESTION = 'ImageOptionsMultiWithOpenQuestion';

export const MEDIA_QUESTION = 'MediaQuestion';
export const MEDIA_MULTI_QUESTION = 'MediaMultiQuestion';
export const MEDIA_WITH_OPEN_QUESTION = 'MediaWithOpenQuestion';
export const MEDIA_MULTI_WITH_OPEN_QUESTION = 'MediaMultiWithOpenQuestion';

export const MATRIX_SINGLE_QUESTION = 'MatrixSingleQuestion';
export const MATRIX_MULTI_QUESTION = 'MatrixMultiQuestion';
export const MATRIX_SINGLE_IMAGE_QUESTION = 'MatrixSingleImageQuestion';
export const MATRIX_MULTI_IMAGE_QUESTION = 'MatrixMultiImageQuestion';

export const DIVIDE_QUESTION = 'DivideQuestion';
export const ORDER_QUESTION = 'OrderQuestion';

export function isOptionImage(questionType){
  return questionType === IMAGE_OPTIONS_QUESTION
  || IMAGE_OPTIONS_MULTI_QUESTION === questionType
  || questionType === IMAGE_OPTIONS_WITH_OPEN_QUESTION
  || questionType === IMAGE_OPTIONS_MULTI_WITH_OPEN_QUESTION
  || questionType === MATRIX_MULTI_IMAGE_QUESTION
  || questionType === MATRIX_SINGLE_IMAGE_QUESTION;
}

export function hasImagePreview(questionType){
  return questionType === MEDIA_QUESTION ||
  questionType === MEDIA_MULTI_QUESTION ||
  questionType === MEDIA_WITH_OPEN_QUESTION ||
  questionType === MEDIA_MULTI_WITH_OPEN_QUESTION;
}
