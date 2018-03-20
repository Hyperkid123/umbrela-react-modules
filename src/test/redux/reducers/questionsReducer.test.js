import reducer from '../../../redux/reducers/questionsReducer'
import * as types from '../../../redux/actions/actionTypes';

describe('Questions reducer', () => {
  let initialState = {}
  beforeAll(() => {
    initialState = {
      questions: null,
      activeQuestion: null,
      isFetching: false,
      newQuestion: false,
      failed: false,
      allQuestions: {}
    }
  })

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should chnage scale points in active question', () => {
    const scalePoints = 999;
    const question = {
      scalePoints: 100
    }
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...question,
        scalePoints,
        newQuestion: false
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion: question
    }, {
      type: types.CHANGE_SCALE_POINTS,
      scalePoints
    })).toEqual(expectedState)
  })

  it('should deselect active question', () => {
    const activeState = {
      ...initialState,
      activeQuestion: {foo: 'foo'}
    }
    expect(reducer({...activeState}, {
      type: types.DESELECT_QUESTION
    })).toEqual(initialState)

    expect(reducer({...activeState}, {
      type: types.SELECT_EDITOR_SHEET
    })).toEqual(initialState)

    expect(reducer({...activeState}, {
      type: types.RECEIVE_NEW_SHEET
    })).toEqual(initialState)
  })

  it('should set isFetching to false', () => {
    const fetchingState = {
      ...initialState,
      isFetching: true
    }

    expect(reducer({...fetchingState}, {
      type: types.FINISH_FETCH
    })).toEqual(initialState)

    expect(reducer({...fetchingState}, {
      type: types.DRAG_END
    })).toEqual(initialState)
  })

  it('should set isFetching to true while requesting new question', () => {
    expect(reducer(initialState, {
      type: types.REQUEST_QUESTION
    })).toEqual({
      ...initialState,
      isFetching: true
    })
  })

  it('it should set activeQuestion while receiving new one', () => {
    const questions = [{
      questionId: 999,
    }, {
      questionId: 152
    }]
    const expectedState = {
      ...initialState,
      questions,
      activeQuestion: {
        ...questions[1],
        newQuestion: true
      }
    }
    expect(reducer({
      ...initialState,
      questions
    }, {
      type: types.RECEIVE_NEW_QUESTION,
      questionId: 152
    })).toEqual(expectedState)
  })

  it('should set activeQuestion', () => {
    const questions = [{
      questionId: 999,
    }, {
      questionId: 152
    }]
    const expectedState = {
      ...initialState,
      questions,
      activeQuestion: {
        ...questions[1],
      }
    }
    expect(reducer({
      ...initialState,
      questions
    }, {
      type: types.SELECT_EDITOR_QUESTION,
      questionId: 152
    })).toEqual(expectedState)
  })

  it('should update active question', () => {
    const oldState = {
      ...initialState,
      activeQuestion: {
        title: 'foo'
      }
    }
    const newQuestion = {
      title: 'title'
    }
    const expectedState = {
      ...initialState,
      activeQuestion: newQuestion
    }
    expect(reducer(oldState, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question: newQuestion
    })).toEqual(expectedState);
  })

  it('should change active question title', () => {
    const oldState = {
      ...initialState,
      activeQuestion: {
        title: 'foo'
      }
    }
    const expectedState = {
      ...initialState,
      activeQuestion: {
        title: 'title',
        newQuestion: false
      }
    }
    expect(reducer(oldState, {
      type: types.CHANGE_QUESTION_TITLE,
      title: 'title'
    })).toEqual(expectedState);
  })

  it('should reorder questions', () => {
    const questions = [{
      title: 'question 1'
    }, {
      title: 'question 2'
    }, {
      title: 'question 3'
    }]

    const reOrderedQuestions = [{
      title: 'question 3'
    }, {
      title: 'question 2'
    }, {
      title: 'question 1'
    }]

    const expectedState = {
      ...initialState,
      questions: reOrderedQuestions
    }

    expect(reducer({
      ...initialState,
      questions
    }, {
      type: types.DRAG_QUESTION_CARD,
      dragIndex: 0,
      hoverIndex: 2
    })).toEqual(expectedState)
  })

  it('should chnage mandatory option in active question', () => {
    const activeQuestion = {
      mandatory: false,
    }
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...activeQuestion,
        mandatory: true
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion
    }, {
      type: types.CHANGE_MANDATORY_QUESTION,
      mandatory: true
    })).toEqual(expectedState)
  })

  it('should chnage custom help in active question', () => {
    const activeQuestion = {}
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...activeQuestion,
        hasCustomHelp: true,
        customHelp: '(Zadejte vlastní nápovědu)'
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion
    }, {
      type: types.SET_CUSTOM_HELP,
      hasCustomHelp: true,
      customHelp: 'foo'
    })).toEqual(expectedState)
  })

  it('should chnage custom help in active question', () => {
    const activeQuestion = {}
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...activeQuestion,
        customHelp: 'foo'
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion
    }, {
      type: types.CHANGE_CUSTOM_HELP,
      customHelp: 'foo'
    })).toEqual(expectedState)
  })

  it('should chnage question type', () => {
    const activeQuestion = {
      questionType: 'type 1'
    }
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...activeQuestion,
        questionType: 'type 2'
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion
    }, {
      type: types.CHANGE_QUESTION_TYPE,
      questionType: 'type 2'
    })).toEqual(expectedState)
  })

  it('should chnage question type', () => {
    const activeQuestion = {
      url: 'foo.com'
    }
    const expectedState = {
      ...initialState,
      activeQuestion: {
        ...activeQuestion,
        url: 'url.com'
      }
    }
    expect(reducer({
      ...initialState,
      activeQuestion
    }, {
      type: types.CHANGE_QUESTION_IMAGE_URL,
      url: 'url.com'
    })).toEqual(expectedState)
  })

  it('should log fetch failure', () => {
    expect(reducer(initialState, {
      type: types.QUESTION_FETCH_FAILED
    })).toEqual({
      ...initialState,
      failed: true
    })
  })

  it('should store new sheet questions', () => {
    const sheets = {
      "1": [{}, {}, {}]
    }
    const otherSheetQuestions = [{
      title: 'newQuestion'
    }]
    const preLoadedState = {
      ...initialState,
      allQuestions: sheets
    }
    const expectedState = {
      ...initialState,
      allQuestions: {
        ...sheets,
        "2": otherSheetQuestions,
      }
    }
    expect(reducer(preLoadedState, {
      type: types.STORE_QUESTIONS,
      payload: {
        sheetId: 2,
        questions: otherSheetQuestions
      }
    })).toEqual(expectedState)
  })

  it('should receive new sheet questions', () => {
    const questions = [{
      title: 'question 1'
    }, {
      title: 'question 2'
    }]

    const expectedState = {
      ...initialState,
      questions
    }

    expect(reducer(initialState, {
      type: types.GET_SHEET_QUESTIONS,
      questions
    })).toEqual(expectedState)
  })
});
