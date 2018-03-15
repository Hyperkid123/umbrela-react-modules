import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('sync Answer actions', () => {
  let questionId;
  let optionId;
  beforeAll(() => {
    questionId = 1;
    optionId = 2;
  })
  it('should create answerCloseOpenQuestion action', () => {
    const answer = 'foo';
    const expectedEmptyAction = {
      type: types.CLOSE_OPEN_QUESTION_ANSWER,
      payload: {
        questionId,
        optionId,
        answer: ''
      }
    };
    const expectedFooAction = {
      type: types.CLOSE_OPEN_QUESTION_ANSWER,
      payload: {
        questionId,
        optionId,
        answer,
      }
    };
    expect(actions.answerCloseOpenQuestion(questionId, optionId)).toEqual(expectedEmptyAction);
    expect(actions.answerCloseOpenQuestion(questionId, optionId, answer)).toEqual(expectedFooAction);
  });

  it('should create answerOptionAnswer action', () => {
    const checked = true;
    const expectedAction = {
      type: types.CLOSE_QUESTION_ANSWER,
      payload: {
        questionId,
        optionId,
        checked,
      }
    };
    expect(actions.answerOptionAnswer(questionId, optionId, checked)).toEqual(expectedAction);
  })

  it('should create answerMultiQuestion action', () => {
    const checked = false;
    const expectedAction = {
      type: types.CLOSE_MULTI_ANSWER,
      payload: {
        questionId,
        optionId,
        checked,
      }
    }
    expect(actions.answerMultiQuestion(questionId, optionId, checked)).toEqual(expectedAction);
  })

  it('should create answerOpenQuestion action', () => {
    const answer = 'foo';
    const expectedAction = {
      type: types.OPEN_QUESTION_ANSWER,
      payload: {
        questionId,
        answer,
      }
    }
    expect(actions.answerOpenQuestion(questionId, answer)).toEqual(expectedAction);
  })

  it('should create answerDivideQuestion action', () => {
    const scalePoints = 100;
    const size = 10;
    const index = 1;
    const expectedAction = {
      type: types.DIVIDE_QUESTION_ANSWER,
      payload: {
        questionId,
        scalePoints,
        size,
        index,
      }
    }
    expect(actions.answerDivideQuestion(questionId, scalePoints, size, index)).toEqual(expectedAction);
  })

  it('should create dragCard action', () => {
    const options = [];
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: types.DRAG_CARD,
      payload: {
        questionId,
        options,
        dragIndex,
        hoverIndex
      }
    }
    expect(actions.dragCard(questionId, options, dragIndex, hoverIndex)).toEqual(expectedAction)
  })

  it('should create createCards action', () => {
    const options = [];
    const expectedAction = {
      type: types.CREATE_CARDS,
      payload: {
        questionId,
        options
      }
    }
    expect(actions.createCards(questionId, options)).toEqual(expectedAction);
  })

  it('should create answerMatrixSingle and answerMatrixMulti actions', () => {
    const rowId = 1;
    const columnId = 10;
    const checked = true;
    const expectedActionSingle = {
      type: types.MATRIX_SINGLE_ANSWER,
      payload: {
        questionId,
        rowId,
        columnId,
        checked
      }
    }

    const expectedActionMulti = {
      type: types.MATRIX_MULTI_ANSWER,
      payload: {
        questionId,
        rowId,
        columnId,
        checked
      }
    }
    expect(actions.answerMatrixSingle(questionId, rowId, columnId, checked)).toEqual(expectedActionSingle);
    expect(actions.answerMatrixMulti(questionId, rowId, columnId, checked)).toEqual(expectedActionMulti);
  })

  it('should create resetAnswers action', () => {
    expect(actions.resetAnswers()).toEqual({type: types.RESET_ANSWERS});
  })
})

describe('Async answers actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should fetch answers', () => {
    let store = mockStore({research: {startTime: 1}});
    const expectedActions = [{
      type: types.RESET_ANSWERS,
    }, {
      type: types.ANSWERS_SUBBMITED
    }]
    fetchMock.postOnce(`${window.base}save-session/${window.researchId}`, {
      response: {test: true}
    })
    return store.dispatch(actions.submitAnswers([{foo: 'foo'}]))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should catch fetch answers error', () => {
    let store = mockStore({research: {startTime: 1}});
    fetchMock.postOnce(`${window.base}save-session/${window.researchId}`, {
      status: 500
    })
    return store.dispatch(actions.submitAnswers([{foo: 'foo'}]))
    .then(() => {
      expect(store.getActions()).toEqual([]);
    });
  })
});
