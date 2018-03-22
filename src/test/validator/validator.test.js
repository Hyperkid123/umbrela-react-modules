import * as validator from '../../common/validator';

describe('validator', () => {
  it('should validate sheet title', () => {
    expect(validator.sheetInfoValidator({title: 'foo'})).toBeTruthy();
    let c = '';
    for(c; c.length < 300;) c = Math.random().toString(36).substr(2, 1);
    expect(validator.sheetInfoValidator({title: c})).toBeFalsy();
  })

  it('should valide if string is URL to image', () => {
    expect(validator.validateUrl('sdasda')).toBeFalsy();
    expect(validator.validateUrl('https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg'))
    .toBeTruthy();
  })

  it('should validate option', () => {
    expect(validator.ValideOption('foo', 'CloseQuestion', 'NormalOption'))
    .toBeTruthy();
    expect(validator.ValideOption('foo', 'ImageOptionsQuestion', 'NormalOption'))
    .toBeFalsy();
    expect(validator.ValideOption('foo', 'MatrixSingleQuestion', 'ColumnOption'))
    .toBeTruthy();
    expect(validator.ValideOption('foo', 'MatrixSingleImageQuestion', 'RowOption'))
    .toBeFalsy();
  })

  it('should return correct validate message', () => {
    expect(validator.getOptionValidationMessage('foo', 'CloseQuestion', 'NormalOption'))
    .toBe('');
    expect(validator.getOptionValidationMessage('foo', 'ImageOptionsQuestion', 'NormalOption'))
    .toBe('Zadaný řetězec není URL obrázku.');
    expect(validator.getOptionValidationMessage('foo', 'MatrixSingleQuestion', 'ColumnOption'))
    .toBe('');
    expect(validator.getOptionValidationMessage('foo', 'MatrixSingleImageQuestion', 'RowOption'))
    .toBe('Zadaný řetězec není URL obrázku.');
    expect(validator.getOptionValidationMessage('', 'CloseQuestion', 'RowOption'))
    .toBe('Vyplňte prosím text možnosti.');
    let c = '';
    for(c; c.length < 300;) c = Math.random().toString(36).substr(2, 1);
    expect(validator.getOptionValidationMessage(c, 'CloseQuestion', 'RowOption'))
    .toBe(`Možnost může mít maxinálně 255 znaků (${c.length}).`);
  })

  it('should validate divide question answer', () => {
    const sheet = {
      questions: [{
        isMandatory: true,
        questionType: 'DivideQuestion',
        questionId: 0,
        scalePoints: 100
      }]
    };
    let answers = {
      "0": [50, 1, 1]
    };
    const filters = {};
    expect(validator.validateAnswers(sheet, answers, filters)).toEqual({
      valid: false,
      errors: {'0': 'Please divide all points'}
    });
    answers = {
      '0': [50, 50]
    }
    expect(validator.validateAnswers(sheet, answers, filters)).toEqual({
      valid: true,
      errors: {}
    });
  })

  it('should validate matrix question answer', () => {
    const sheet = {
      questions: [{
        isMandatory: true,
        questionType: 'MatrixSingleQuestion',
        questionId: 0,
        options: [{
          optionType: 'RowOption',
          optionId: 1
        }]
      }]
    };
    let answers = {
      '0': {
        '1': {}
      }
    }
    const filters = {};
    expect(validator.validateAnswers(sheet, answers, filters)).toEqual({
      valid: true,
      errors: {}
    });
  });
});
