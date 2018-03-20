import reducer from '../../../redux/reducers/dataReviewReducer';
import * as types from '../../../redux/actions/actionTypes';

describe('Data review reducer', () => {
  let expectedState = {};
  let initialState = {};
  let closeData = {};
  let dataMap = new Map();
  let expectedCloseState = {};
  beforeEach(() => {
    initialState = {
      isFetching: false,
      didInvalidate: false,
      questions: {},
      questionData: new Map(),
      question: null
    }
    expectedState = {
      isFetching: false,
      didInvalidate: false,
      questions: {},
      questionData: new Map(),
      question: null
    }
    closeData = [{
      type: 'CloseQestion',
      questionId: 100,
      options: [{
        optionId: 1,
        title: 'option 1'
      }, {
        optionId: 2,
        title: 'option 2'
      }],
      answers: [{
        optionId: 1
      }, {
        optionId: 2
      }]
    }];
    dataMap.set(100, {
      "answerCount": 2,
      "barData": {
        "backroundLine": "rgba(75,192,192,0.4)",
        "backroundPie": null,
        "data": {
          "datasets":  [{
              "backgroundColor":  [
                "#f44336",
                "#e91e63",
              ],
              "borderColor": "#e0e0e0",
              "borderWidth": 0.5,
              "data": [
                1,
                1,
              ],
              "label": "# počet odpovědí",
              "lineTension": 0.1,
            },
          ],
          "labels": [
            "option 1",
            "option 2",
          ],
          "xLabels": [
            "option 1",
            "option 2",
          ]},
      },
      "respondents": 2,
    })
    expectedCloseState = {
        ...initialState,
        "lastUpdated": "foo",
        "question": {
          "answers": [{
              "optionId": 1,
            }, {
              "optionId": 2,
            }],
          "options": [{
              "optionId": 1,
              "title": "option 1",
            }, {
              "optionId": 2,
              "title": "option 2",
            }],
          "questionId": 100,
          "type": "CloseQestion",
        },
        "questionData":  dataMap,
        "questions": {
          "100": {
            "answers": [{
                "optionId": 1,
              }, {
                "optionId": 2,
              }],
            "options": [{
                "optionId": 1,
                "title": "option 1",
              }, {
                "optionId": 2,
                "title": "option 2",
              }],
            "questionId": 100,
            "type": "CloseQestion",
          },
        },
      }
  })

  it('should return correct initial state', () => {
    expect(reducer(undefined, {type: 'foo'})).toEqual(expectedState);
  })

  it('should invalidate state', () => {
    expect(reducer(undefined, {
      type: types.INVALIDATE_QUESTION
    })).toEqual({...expectedState, didInvalidate: true})
  })

  it('should set isFetching to true', () => {
    expect(reducer(initialState, {
      type: types.REQUEST_QUESTION
    })).toEqual({...expectedState})
  })

  it('should compute data for close question', () => {
    expect(reducer(initialState, {
      type: 'RECEIVE_QUESTION_ANSWERS',
      question: closeData,
      receivedAt: 'foo',
    })).toEqual(expectedCloseState)
  })

  it('should compute data for open question', () => {
    const openData = [{
      type: 'openQueston',
      answers: [{
        openAnswer: 'foo'
      }, {
        openAnswer: 'foo2'
      }]
    }]
    const expectedOpenState = {
      ...initialState,
      "lastUpdated": "foo",
      "question": {
        "answers": [{
            "openAnswer": "foo",
          }, {
            "openAnswer": "foo2",
          }],
        "type": "openQueston",
      },
    }
    expect(reducer(initialState, {
      type: 'RECEIVE_QUESTION_ANSWERS',
      question: openData,
      receivedAt: 'foo',
    })).toEqual(expectedOpenState)
  })

  it('should compute data for matrix question', () => {
    const matrixData = [{
      type: 'MatrixSingleQuestion',
      questionId: 555,
      options: [{
        optionId: 1,
        optionType: 'RowOption',
        title: 'row',
      }, {
        optionId: 20,
        title: 'column'
      }],
      answers: [{
        rowId: 1,
        sessionId: 999,
        colId: 20
      }, {
        rowId: 1,
        sessionId: 1000,
        colId: 20
      }]
    }]
    const matrixMap = new Map();
    matrixMap.set(555,{
      "dividedData": [{
      "answerCount": 2,
      "backroundLine":
      "rgba(75,192,192,0.4)",
      "backroundPie": null,
      "data": {
        "datasets": [{
          "backgroundColor": ["#9c27b0"],
          "borderColor": "#e0e0e0",
          "borderWidth": 0.5,
          "data": [2],
          "label": "# počet odpovědí",
          "lineTension": 0.1
        }],
        "labels": ["column"],
        "xLabels": ["column"]},
        "questionTitle": "row",
        "respondents": 2
      }]
    })
    const expectedMatrixState = {
      "didInvalidate": false,
      "isFetching": false,
      "lastUpdated": "foo",
      "question": {
        questionId: 555,
        "answers": [{
          "colId": 20,
          "rowId": 1,
          "sessionId": 999
        }, {
          "colId": 20,
          "rowId": 1,
          "sessionId": 1000
        }],
        "options": [{
          "optionId": 1,
          "optionType":
          "RowOption",
          "title": "row"
        }, {
          "optionId": 20,
          "title": "column"
        }],
        "type": "MatrixSingleQuestion"
      },
      "questionData": matrixMap,
      "questions": {
        "555": {
          "answers": [{
              "colId": 20,
              "rowId": 1,
              "sessionId": 999,
            }, {
              "colId": 20,
              "rowId": 1,
              "sessionId": 1000,
            }],
          "options": [{
              "optionId": 1,
              "optionType": "RowOption",
              "title": "row",
            }, {
              "optionId": 20,
              "title": "column",
            }],
          "questionId": 555,
          "type": "MatrixSingleQuestion",
        },
      },
    }
    expect(reducer(initialState, {
      type: 'RECEIVE_QUESTION_ANSWERS',
      question: matrixData,
      receivedAt: 'foo',
    })).toEqual(expectedMatrixState)
  })

  it('should compute data for order question', () => {
    const orderData = [{
      type: 'OrderQuestion',
      questionId: 111,
      options: [{
        title: 'option 1',
        optionId: 1
      }, {
        title: 'option 2',
        optionId: 2
      }],
      answers: [{
        optionId: 1,
        numericAnswer: 13,
        sessionId: 15,
      }, {
        optionId: 2,
        numericAnswer: 44,
        sessionId: 15
      }, {
        optionId: 2,
        numericAnswer: 78,
        sessionId: 1
      }]
    }];
    const orderMapData = new Map();
    const orderMap = new Map();
    orderMapData.set(1, {
        "avg": 14,
        "count": 14,
        "median": 14,
        "modus": 14,
        "title": "option 1",
        "values": [14],
    });
    orderMapData.set(2, {
      "avg": 62,
      "count": 124,
      "median": 62,
      "modus": 45,
      "title": "option 2",
      "values": [45, 79],
    });
    orderMap.set(111, {
      "answerCount": 3,
      "data": orderMapData,
      "respondents": 3,
    },)
    const expectedOrderState = {
      ...initialState,
      "lastUpdated": "foo",
      "question": {
        questionId: 111,
        "answers": [{
            "numericAnswer": 13,
            "optionId": 1,
            "sessionId": 15,
          }, {
            "numericAnswer": 44,
            "optionId": 2,
            "sessionId": 15,
          }, {
            "numericAnswer": 78,
            "optionId": 2,
            "sessionId": 1,
          }],
        "options": [{
            "optionId": 1,
            "title": "option 1",
          }, {
            "optionId": 2,
            "title": "option 2",
          }],
        "type": "OrderQuestion",
      },
      "questionData": orderMap,
      "questions": {
        "111": {
          questionId: 111,
          "answers": [{
              "numericAnswer": 13,
              "optionId": 1,
              "sessionId": 15,
            }, {
              "numericAnswer": 44,
              "optionId": 2,
              "sessionId": 15,
            }, {
              "numericAnswer": 78,
              "optionId": 2,
              "sessionId": 1,
            }],
          "options": [{
              "optionId": 1,
              "title": "option 1",
            }, {
              "optionId": 2,
              "title": "option 2",
            }],
          "type": "OrderQuestion",
        },
      },
    }
    expect(reducer(initialState, {
      type: 'RECEIVE_QUESTION_ANSWERS',
      question: orderData,
      receivedAt: 'foo',
    })).toEqual(expectedOrderState)
  })
});
