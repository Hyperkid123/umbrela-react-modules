import * as questionTypes from '../../common/questionTypes';

describe('Question types functions', () => {
  let allTypes = [
    'OpenQuestion',
    'CloseQuestion',
    'CloseWithOpenQuestion',
    'CloseMultiQuestion',
    'CloseMultiWithOpenQuestion',
    'MatrixSingleQuestion',
    'MatrixMultiQuestion',
    'MatrixTextQuestion',
    'OrderQuestion',
    'DivideQuestion',
    'OpenLongQuestion',
    'OpenWithImageQuestion',
    'MediaQuestion',
    'MediaMultiQuestion',
    'MediaWithOpenQuestion',
    'MediaMultiWithOpenQuestion',
    'ImageOptionsQuestion',
    'ImageOptionsMultiQuestion',
    'ImageOptionsWithOpenQuestion',
    'ImageOptionsMultiWithOpenQuestion',
    'MatrixSingleImageQuestion',
    'MatrixMultiImageQuestion',
    'OpenWithImageQuestionLong',
  ];
  let couldBeOpen = [
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
      'ImageOptionsMultiWithOpenQuestion'
    ];
  let onlyCloseQuestion = allTypes.filter(e => !couldBeOpen.includes(e));
  let isOpenQuestion = [
    'CloseWithOpenQuestion',
    'CloseMultiWithOpenQuestion',
    'MediaWithOpenQuestion',
    'MediaMultiWithOpenQuestion',
    'ImageOptionsWithOpenQuestion',
    'ImageOptionsMultiWithOpenQuestion',
  ]
  let isNotOpen = allTypes.filter(e => !isOpenQuestion.includes(e));
  let couldBeMultiple = [
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
  ];
  let canNotBeMultiple = allTypes.filter(e => !couldBeMultiple.includes(e));
  let isMultipleAnswer = [
    'CloseMultiQuestion',
    'CloseMultiWithOpenQuestion',
    'MediaMultiQuestion',
    'MediaMultiWithOpenQuestion',
    'ImageOptionsMultiQuestion',
    'ImageOptionsMultiWithOpenQuestion',
    'MatrixMultiImageQuestion',
    'MatrixMultiQuestion',
  ];
  let isNotMultipleAnswer = allTypes.filter(e => !isMultipleAnswer.includes(e));

  it('question can have open question', () => {
    couldBeOpen.forEach((question) => {
      expect(questionTypes.CanHaveOpenQuestion(question)).toBeTruthy()
    })
  })

  it('question should not have open question', () => {
    onlyCloseQuestion.forEach((question) => {
      expect(questionTypes.CanHaveOpenQuestion(question)).toBeFalsy()
    })
  })

  it('question should be open', () => {
    isOpenQuestion.forEach((question) => {
      expect(questionTypes.HasOpenQuestion(question)).toBeTruthy();
    })
  })

  it('question should not be open', () => {
    isNotOpen.forEach((question) => {
      expect(questionTypes.HasOpenQuestion(question)).toBeFalsy();
    })
  })

  it('question could have multiple answers', () => {
    couldBeMultiple.forEach((question) => {
      expect(questionTypes.CanHaveMultipleAnswers(question)).toBeTruthy();
    })
  })

  it('question should not have multiple answers', () => {
    canNotBeMultiple.forEach((question) => {
      expect(questionTypes.CanHaveMultipleAnswers(question)).toBeFalsy();
    })
  })

  it('question has multiple answers', () => {
    isMultipleAnswer.forEach((question) => {
      expect(questionTypes.HasMultipleAnswers(question)).toBeTruthy();
    })
  })

  it('question has not multiple answers', () => {
    isNotMultipleAnswer.forEach((question) => {
      expect(questionTypes.HasMultipleAnswers(question)).toBeFalsy();
    })
  })
})
