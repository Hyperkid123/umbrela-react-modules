import * as utils from '../../common/utils'

describe('utils functions' , () => {
  it('should return correct question order', () => {
    const fooArray = ['foo', 'foo', 'foo'];
    expect(utils.getNewOptionOrder(fooArray, 'CloseQuestion')).toBe(3);
    expect(utils.getNewOptionOrder(fooArray, 'CloseWithOpenQuestion')).toBe(2);
  })

  it('should find open option', () => {
    const options = [{
      optionType: 'NormalOption'
    },{
      optionType: 'NormalOption'
    },{
      optionType: 'NormalOption'
    },{
      optionType: 'NormalOption'
    },{
      optionType: 'NormalOption'
    },{
      optionType: 'OpenOption'
    }];

    expect(utils.findOpenOption(options)).toBeTruthy();
    options.pop();
    expect(utils.findOpenOption(options)).toBeFalsy();
  })

  it('should return correct input type', () => {
    expect(utils.getOptionsInputType('CloseQuestion')).toBe('radioButton');
    expect(utils.getOptionsInputType('CloseMultiQuestion')).toBe('checkBox');
  })

  it('should divide matrix options', () => {
    const options = [{
      optionType: 'ColumnOption',
    },{
      optionType: 'ColumnOption',
    },{
      optionType: 'ColumnOption',
    },{
      optionType: 'RowOption',
    },{
      optionType: 'RowOption',
    },{
      optionType: 'RowOption',
    },{
      optionType: 'ColumnOption',
    }];
    const expectedRows = [{
      optionType: 'RowOption',
    },{
      optionType: 'RowOption',
    },{
      optionType: 'RowOption',
    }];
    const expectedColumns = [{
      optionType: 'ColumnOption'
    },{
      optionType: 'ColumnOption'
    },{
      optionType: 'ColumnOption'
    },{
      optionType: 'ColumnOption'
    }];
    const result = utils.divideMatrixOptions(options);
    expect(result.rows).toEqual(expectedRows);
    expect(result.columns).toEqual(expectedColumns);
  })
})
