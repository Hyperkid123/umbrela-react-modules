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

  it('should create divide data for divide question', () => {
    const questionOptions = [{
      title: 'option 1',
      optionId: 1
    }, {
      title: 'option 2',
      optionId: 2
    }];
    const questionAnswers = [{
      optionId: 1,
      numericAnswer: 33,
    }, {
      optionId: 2,
      numericAnswer: 11
    }, {
      optionId: 2,
      numericAnswer: 12
    }]
    const questionType = 'DivideQuestion';
    const expectedResult = new Map();
    expectedResult.set(1,  {
      count: 33,
      values: [ 33 ],
      avg: 33,
      median: 33,
      modus: 33,
      title: 'option 1' }
    )
    expectedResult.set(2, {
      count: 23,
      values: [ 11, 12 ],
      avg: 11.5,
      median: 11.5,
      modus: 11,
      title: 'option 2' }
    )
    expect(utils.createDivideData(questionOptions, questionAnswers, questionType))
    .toEqual(expectedResult);
  })

  it('should return correct respondetns number for multiple choice question', () => {
    const questionType = 'SomethingMulti';
    const answers = [{
      sessionId: 1,
    }, {
      sessionId: 1,
    }, {
      sessionId: 1,
    }, {
      sessionId: 2,
    }, {
      sessionId: 2,
    }]
    expect(utils.getRespondents(answers, questionType)).toEqual(2);
  })

  it('should include empty answers', () => {
    const questionOptions = [{
      optionId: 10,
      title: 'foo'
    }, {
      optionId: 1,
      title: 'foo'
    }, {
      optionId: 0,
      title: 'foo'
    }]

    const questionAnswers = [{

    }, {
      optionId: 10
    }, {
      shortAnswer: 'foo'
    }]
    const expectedResult = {
      data: {
        labels: [ 'foo', 'foo', 'foo', 'nezodpovězeno' ],
        xLabels: [ 'foo', 'foo', 'foo', 'nezodpovězeno' ],
        datasets: [{
            "backgroundColor": [
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
            ],
            "borderColor": "#e0e0e0",
            "borderWidth": 0.5,
            "data": [
              1,
              0,
              0,
              1,
            ],
            "label": "# počet odpovědí",
            "lineTension": 0.1,
        }]
       },
       backroundPie: null,
       backroundLine: 'rgba(75,192,192,0.4)'
     }
    expect(utils.createChartData(questionOptions, questionAnswers, 'CloseQuestion', true))
    .toEqual(expectedResult);
  })

  it('should truncate long option label', () => {
    const questionOptions =[{
      title: 'Some long option title that should be cut',
      id: 'optionId',
    }]
    const expectedResult =  {
      "backroundLine": "rgba(75,192,192,0.4)",
      "backroundPie": null,
      "data": {
        "datasets": [
          {
            "backgroundColor": [
              "#3f51b5",
            ],
            "borderColor": "#e0e0e0",
            "borderWidth": 0.5,
            "data": [
              0,
            ],
            "label": "# počet odpovědí",
            "lineTension": 0.1,
          },
        ],
        "labels": [
          "Some long option title that should be cut",
        ],
        "xLabels": [
          "Some long opti...",
        ],
      },
    };
    expect(utils.createChartData(questionOptions, [], 'CloseQuestion', true))
    .toEqual(expectedResult);
  })
})
