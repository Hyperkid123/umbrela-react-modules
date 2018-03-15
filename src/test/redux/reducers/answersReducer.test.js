import reducer from '../../../redux/reducers/answersReducer';
import * as types from '../../../redux/actions/actionTypes';

describe('answers reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      isFetching: false,
    }
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('shloud add first close open question answer', () => {
    const questionId = 1;
    const question = {
      openAnswer: 'answer',
      options: [],
      optionId: 1
    };
    const expectedState = {
      isFetching: false,
      "1": question,
    }
    const payload = {
      optionId: 1,
      answer: 'answer',
      questionId,
    }
    expect(reducer(undefined, {
        type: types.CLOSE_OPEN_QUESTION_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('shloud remove first close open question answer', () => {
    const questionId = 1;
    const question = {
      openAnswer: '',
      optionId: null
    };
    const expectedState = {
      isFetching: false,
      "1": question,
    }
    const payload = {
      optionId: 1,
      answer: '',
      questionId,
    }
    expect(reducer(undefined, {
        type: types.CLOSE_OPEN_QUESTION_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should add close question answer', () => {
    const questionId = 1;
    const question = {
      optionId: 1,
      openAnswer: ''
    };
    const expectedState = {
      isFetching: false,
      "1": question,
    }
    const payload = {
      optionId: 1,
      questionId,
    }
    expect(reducer(undefined, {
        type: types.CLOSE_QUESTION_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should add close multi answer', () => {
    const questionId = 1;
    const question = {
      options: [1],
      openAnswer: ''
    };
    const expectedState = {
      isFetching: false,
      "1": question,
    }
    const payload = {
      optionId: 1,
      questionId,
      checked: true
    }
    expect(reducer(undefined, {
        type: types.CLOSE_MULTI_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should remove close multi answer', () => {
    const questionId = 1;
    const question = {
      options: [2],
    };
    const initialState = {
      "1": {
        options: [1, 2]
      }
    }
    const expectedState = {
      "1": question,
    }
    const payload = {
      optionId: 1,
      questionId,
      checked: false
    }
    expect(reducer(initialState, {
        type: types.CLOSE_MULTI_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should remove question from state on close multi answer', () => {
    const questionId = 1;
    const initialState = {
      "1": {
        options: [1,]
      }
    }
    const expectedState = {}
    const payload = {
      optionId: 1,
      questionId,
      checked: false
    }
    expect(reducer(initialState, {
        type: types.CLOSE_MULTI_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should add to existing question close multi answer', () => {
    const questionId = 1;
    const question = {
      options: [2, 1],
    };
    const initialState = {
      "1": {
        options: [2]
      }
    }
    const expectedState = {
      "1": question,
    }
    const payload = {
      optionId: 1,
      questionId,
      checked: true
    }
    expect(reducer(initialState, {
        type: types.CLOSE_MULTI_ANSWER,
        payload
      })).toEqual(expectedState)
  })

  it('should add open answer on open question answer', () => {
    const questionId = 1;
    const payload = {
      questionId,
      answer: 'foo',
    }
    const expectedState = {
      isFetching: false,
      "1": 'foo'
    }
    expect(reducer(undefined, {
      type: types.OPEN_QUESTION_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should remove open answer on empty open question answer', () => {
    const questionId = 1;
    const payload = {
      questionId,
      answer: '',
    }
    const expectedState = {
      isFetching: false,
    }
    expect(reducer(undefined, {
      type: types.OPEN_QUESTION_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should add answer on divide question answer', () => {
    const questionId = 1;
    const scalePoints = 13;
    const payload = {
      questionId,
      scalePoints,
      index: 0,
      size: 2,
    }
    const expectedState = {
      isFetching: false,
      "1": [scalePoints, 0]
    }
    expect(reducer(undefined, {
      type: types.DIVIDE_QUESTION_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should update answer on divide question answer', () => {
    const questionId = 1;
    const scalePoints = 13;
    const payload = {
      questionId,
      scalePoints,
      index: 0
    }
    const initialState = {
      isFetching: false,
      "1": [0, 0],
    }
    const expectedState = {
      isFetching: false,
      "1": [scalePoints, 0]
    }
    expect(reducer(initialState, {
      type: types.DIVIDE_QUESTION_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should chnage order on drag card', () => {
    const questionId = 1;
    const options = [{title: 'option1'}, {title: 'option2'}]
    const payload = {
      questionId,
      index: 0,
      dragIndex: 0,
      hoverIndex: 1,
      options,
    }
    const initialState = {
      isFetching: false,
      "1": options,
    }
    const expectedState = {
      isFetching: false,
      "1": [{title: 'option2'}, {title: 'option1'}]
    }
    expect(reducer(initialState, {
      type: types.DRAG_CARD,
      payload
    })).toEqual(expectedState);
  })

  it('should initializa answers on create cards', () => {
    const options = [{title: 'option1'}, {title: 'option2'}]
    const payload = {
      questionId: 1,
      options,
    }
    const expectedState = {
      isFetching: false,
      "1": options,
    }
    expect(reducer(undefined, {
      type: types.CREATE_CARDS,
      payload
    })).toEqual(expectedState)
  })

  it('should add first matrix signle answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {"91": [31]},
    }
    const payload = {
      questionId,
      rowId: 91,
      columnId: 31
    }
    expect(reducer(undefined, {
      type: types.MATRIX_SINGLE_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should replace answer to matrix signle answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {"91": [31]},
    }
    const initialState = {
      isFetching: false,
      "1": {"91": [13]}
    }
    const payload = {
      questionId,
      rowId: 91,
      columnId: 31
    }
    expect(reducer(initialState, {
      type: types.MATRIX_SINGLE_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should add answer row to matrix signle answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {
        "91": [13],
        "92": [31]
      },
    }
    const initialState = {
      isFetching: false,
      "1": {"91": [13]}
    }
    const payload = {
      questionId,
      rowId: 92,
      columnId: 31
    }
    expect(reducer(initialState, {
      type: types.MATRIX_SINGLE_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should add first matrix multi answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {"91": [31]},
    }
    const payload = {
      questionId,
      rowId: 91,
      columnId: 31,
      checked: true
    }
    expect(reducer(undefined, {
      type: types.MATRIX_MULTI_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should add answer to matrix multi answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {"91": [13, 31]},
    }
    const initialState = {
      isFetching: false,
      "1": {"91": [13]}
    }
    const payload = {
      questionId,
      rowId: 91,
      columnId: 31,
      checked: true
    }
    expect(reducer(initialState, {
      type: types.MATRIX_MULTI_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should remove answer from matrix multi answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {"91": [13]},
    }
    const initialState = {
      isFetching: false,
      "1": {"91": [13, 31]}
    }
    const payload = {
      questionId,
      rowId: 91,
      columnId: 31,
      checked: false
    }
    expect(reducer(initialState, {
      type: types.MATRIX_MULTI_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should add new answers row to matrix multi answer', () => {
    const questionId = 1
    const expectedState = {
      isFetching: false,
      "1": {
        "91": [13, 31],
        "92": [31]
      },
    }
    const initialState = {
      isFetching: false,
      "1": {"91": [13, 31]}
    }
    const payload = {
      questionId,
      rowId: 92,
      columnId: 31,
      checked: true
    }
    expect(reducer(initialState, {
      type: types.MATRIX_MULTI_ANSWER,
      payload
    })).toEqual(expectedState);
  })

  it('should reset answers', () => {
    const initialState = {
      isFetching: false,
      "1": {"91": [13, 31]}
    }
    const expectedState = {
      isFetching: false,
    }
    expect(reducer(initialState, {
      type: types.RESET_ANSWERS
    })).toEqual(expectedState)
  })

  it('should set isFetching to true', () => {
    const initialState = {
      isFetching: false,
      "1": {"91": [13, 31]}
    }
    const expectedState = {
      isFetching: true,
      "1": {"91": [13, 31]}
    }
    expect(reducer(initialState, {
      type: types.SEND_ANSWERS
    })).toEqual(expectedState);
  })

  it('should submit answers', () => {
    const initialState = {
      isFetching: true,
      "1": {"91": [13, 31]}
    }
    const expectedState = {
      isFetching: false,
      "1": {"91": [13, 31]}
    }
    expect(reducer(initialState, {
      type: types.ANSWERS_SUBBMITED
    })).toEqual(expectedState);
  })
});
