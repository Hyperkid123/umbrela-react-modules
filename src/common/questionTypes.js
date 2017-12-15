export const BaseTypes = [
    'OpenQuestion',
    'CloseQuestion',
    'MatrixSingleQuestion',
    'OrderQuestion',
    'DivideQuestion',
    'MediaQuestion',
];

export const QuestionTypes = {
    OpenQuestion: 'Otevřená',
    CloseQuestion: 'Uzavřená',
    CloseWithOpenQuestion: 'Uzavřená s vlasní odpovědí',
    CloseMultiQuestion: 'Uzavřená s více možnostmi',
    CloseMultiWithOpenQuestion: 'Zavřená s více možnostmi a vlastní odpovědí',
    MatrixSingleQuestion: 'Maticová otázka',
    MatrixMultiQuestion: 'Maticová otázka s volbou více možností',
    MatrixTextQuestion: 'Maticová s texte',
    OrderQuestion: 'Seřazovací otázka',
    DivideQuestion: 'Rozdělovací otázka',
    OpenLongQuestion: 'Open long',
    OpenWithImageQuestion: 'Otevřená s obrázkem v zadání',
    MediaQuestion: 'Uzavřená s obrázkem v zadání',
    MediaMultiQuestion: 'Uzavřená s více možnostmi s obrázkem v zadání',
    MediaWithOpenQuestion: 'Uzavřená s obrázkem a vlastní odpovědí',
    MediaMultiWithOpenQuestion: 'Uzavřená s více možnostmi s obrázkem a vlastní odpovědí',
    ImageOptionsQuestion: 'Obrázky jako možnosti',
    ImageOptionsMultiQuestion: 'Obrázky jako možnosti multiple choice',
    ImageOptionsWithOpenQuestion: 'Obrázky jako možnosti s vlastní odpovědí',
    ImageOptionsMultiWithOpenQuestion: 'Obrázky jako možnosti s vlastní odpovědí multiple',
    MatrixSingleImageQuestion: 'Maticová s obrázky',
    MatrixMultiImageQuestion: 'Maticová s obrázky multiple',
    OpenWithImageQuestionLong: 'Open long s obrazkem v zadani',
};

export const CanHaveOpenQuestion = (questionType) => {
    return [
        'CloseQuestion',
        'CloseWithOpenQuestion',
        'CloseMultiQuestion',
        'CloseMultiWithOpenQuestion',
        'MediaQuestion',
        'MediaMultiQuestion',
        'MediaWithOpenQuestion',
        'MediaMultiWithOpenQuestion',
        'ImageOptionsQuestion',
        'ImageOptionsMultiQuestion',
        'ImageOptionsWithOpenQuestion',
        'ImageOptionsMultiWithOpenQuestion',
    ].includes(questionType);
};

export const HasOpenQuestion = (questionType) => {
    return [
        'CloseWithOpenQuestion',
        'CloseMultiWithOpenQuestion',
        'MediaWithOpenQuestion',
        'MediaMultiWithOpenQuestion',
        'ImageOptionsWithOpenQuestion',
        'ImageOptionsMultiWithOpenQuestion',
    ].includes(questionType);
};

export const CanHaveMultipleAnswers = (questionType) => {
    return [
        'CloseQuestion',
        'CloseWithOpenQuestion',
        'CloseMultiQuestion',
        'CloseMultiWithOpenQuestion',
        'MediaQuestion',
        'MediaMultiQuestion',
        'MediaWithOpenQuestion',
        'MediaMultiWithOpenQuestion',
        'ImageOptionsQuestion',
        'ImageOptionsMultiQuestion',
        'ImageOptionsWithOpenQuestion',
        'ImageOptionsMultiWithOpenQuestion',
        'MatrixMultiImageQuestion',
        'MatrixMultiQuestion',
        'MatrixSingleImageQuestion',
        'MatrixSingleQuestion',
    ].includes(questionType);
};

/**
 * @return {boolean}
 */
export const HasMultipleAnswers = (questionType) => {
    return [
        'CloseMultiQuestion',
        'CloseMultiWithOpenQuestion',
        'MediaMultiQuestion',
        'MediaMultiWithOpenQuestion',
        'ImageOptionsMultiQuestion',
        'ImageOptionsMultiWithOpenQuestion',
        'MatrixMultiImageQuestion',
        'MatrixMultiQuestion',
    ].includes(questionType);
};

/**
 * @return {boolean}
 */
export const IsMatrixQuestion = (questionType) => {
    return [
        'MatrixMultiImageQuestion',
        'MatrixSingleImageQuestion',
        'MatrixMultiQuestion',
        'MatrixSingleQuestion',
        'MatrixTextQuestion',
    ].includes(questionType);
};

/**
 * @return {boolean}
 */
export const HasImagePreview = (questionType) => {
    return [
        'OpenWithImageQuestion',
        'MediaQuestion',
        'MediaMultiQuestion',
        'MediaWithOpenQuestion',
        'MediaMultiWithOpenQuestion',
    ].includes(questionType);
};

export const CanHaveImagePreview = (questionType) => {
    return [
        'OpenWithImageQuestion',
        'OpenQuestion',
        'OpenLongQuestion',
        'OpenWithImageQuestionLong',
    ].includes(questionType);
};

export const HasOptionsAsImage = (questionType) => {
    return [
        'ImageOptionsQuestion',
        'ImageOptionsMultiQuestion',
        'ImageOptionsWithOpenQuestion',
        'ImageOptionsMultiWithOpenQuestion',
        'MatrixSingleImageQuestion',
        'MatrixMultiImageQuestion',

    ].includes(questionType);

};

export const HasScalePoints = (questionType) => {
    return questionType === 'DivideQuestion';
};

export const IsOrderQuestion = (questionType) => {
    return questionType === 'OrderQuestion';
};

export const HasNotOptions = (questionType) => {
    return ['OpenQuestion','OpenWithImageQuestion', 'OpenLongQuestion', 'OpenWithImageQuestionLong'].includes(questionType);
};

export const CanBeOpenLong = (questionType) => {
    return ['OpenQuestion', 'OpenLongQuestion', 'OpenWithImageQuestion', 'OpenWithImageQuestionLong'].includes(questionType);
};

export const IsLongQuestion = (questionType) => {
    return ['OpenLongQuestion', 'OpenWithImageQuestionLong'].includes(questionType);
};

export const SwitchQuestionOpenOption = {
    CloseQuestion: 'CloseWithOpenQuestion',
    CloseWithOpenQuestion: 'CloseQuestion',
    CloseMultiQuestion: 'CloseMultiWithOpenQuestion',
    CloseMultiWithOpenQuestion: 'CloseMultiQuestion',

    MediaQuestion: 'MediaWithOpenQuestion',
    MediaMultiQuestion: 'MediaMultiWithOpenQuestion',
    MediaWithOpenQuestion: 'MediaQuestion',
    MediaMultiWithOpenQuestion: 'MediaMultiQuestion',

    ImageOptionsQuestion: 'ImageOptionsWithOpenQuestion',
    ImageOptionsMultiQuestion: 'ImageOptionsMultiWithOpenQuestion',
    ImageOptionsWithOpenQuestion: 'ImageOptionsQuestion',
    ImageOptionsMultiWithOpenQuestion: 'ImageOptionsMultiQuestion',
};

export const SwitchQuestionMultipleAnswers = {
    CloseQuestion: 'CloseMultiQuestion',
    CloseWithOpenQuestion: 'CloseMultiWithOpenQuestion',
    CloseMultiQuestion: 'CloseQuestion',
    CloseMultiWithOpenQuestion: 'CloseWithOpenQuestion',

    MediaQuestion: 'MediaMultiQuestion',
    MediaMultiQuestion: 'MediaQuestion',
    MediaWithOpenQuestion: 'MediaMultiWithOpenQuestion',
    MediaMultiWithOpenQuestion: 'MediaWithOpenQuestion',

    ImageOptionsQuestion: 'ImageOptionsMultiQuestion',
    ImageOptionsMultiQuestion: 'ImageOptionsQuestion',
    ImageOptionsWithOpenQuestion: 'ImageOptionsMultiWithOpenQuestion',
    ImageOptionsMultiWithOpenQuestion: 'ImageOptionsWithOpenQuestion',

    MatrixSingleImageQuestion: 'MatrixMultiImageQuestion',
    MatrixMultiImageQuestion: 'MatrixSingleImageQuestion',
    MatrixSingleQuestion: 'MatrixMultiQuestion',
    MatrixMultiQuestion: 'MatrixSingleQuestion',
};

export const SwitchToImagePreview =  {
    OpenQuestion: 'OpenWithImageQuestion',
    OpenWithImageQuestion: 'OpenQuestion',
    OpenWithImageQuestionLong: 'OpenLongQuestion',
    OpenLongQuestion: 'OpenWithImageQuestionLong',
};

export const SwitchOptionToImage = {
    CloseQuestion: 'ImageOptionsQuestion',
    CloseWithOpenQuestion: 'ImageOptionsWithOpenQuestion',
    CloseMultiQuestion: 'ImageOptionsMultiQuestion',
    CloseMultiWithOpenQuestion: 'ImageOptionsMultiWithOpenQuestion',
    MatrixSingleQuestion: 'MatrixSingleImageQuestion',
    MatrixMultiQuestion: 'MatrixMultiImageQuestion',
    ImageOptionsQuestion: 'CloseQuestion',
    ImageOptionsMultiQuestion: 'CloseMultiQuestion',
    ImageOptionsWithOpenQuestion: 'CloseWithOpenQuestion',
    ImageOptionsMultiWithOpenQuestion: 'CloseMultiWithOpenQuestion',
    MatrixSingleImageQuestion: 'MatrixSingleQuestion',
    MatrixMultiImageQuestion: 'MatrixMultiQuestion',
};
