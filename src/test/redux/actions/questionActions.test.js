import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Synchronous question actions', () => {
  it('should create selectEditorQuestion action', () => {
    const questionId = 1;
    const expectedAction = {
      type: types.SELECT_EDITOR_QUESTION,
      questionId,
    }
    expect(actions.selectEditorQuestion(questionId)).toEqual(expectedAction);
  })

  it('should create changeQuestionTitle action', () => {
    const title = 'foo';
    const expectedAction = {
      type: types.CHANGE_QUESTION_TITLE,
      title
    }
    expect(actions.changeQuestionTitle(title)).toEqual(expectedAction)
  })

  it('should create dragQuestionCard actions', () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: types.DRAG_QUESTION_CARD,
      dragIndex,
      hoverIndex
    }
    expect(actions.dragQuestionCard(dragIndex, hoverIndex)).toEqual(expectedAction);
  })

  it('should create changeCustomHelp action', () => {
    const customHelp = 'foo';
    const expectedAction = {
      type: types.CHANGE_CUSTOM_HELP,
      customHelp,
    }
    expect(actions.changeCustomHelp(customHelp)).toEqual(expectedAction);
  })

  it('should create changeQuestionUrl action', () => {
      const url = 'foo.com';
      const expectedAction = {
        type: types.CHANGE_QUESTION_IMAGE_URL,
        url
      }
      expect(actions.chnageQuestionUrl(url)).toEqual(expectedAction);
  })

  it('should create changeScalePoints action', () => {
    const scalePoints = 99;
    const expectedAction = {
      type: types.CHANGE_SCALE_POINTS,
      scalePoints
    }
    expect(actions.changeScalePoints(scalePoints)).toEqual(expectedAction);
  })
});

describe('Async question actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })
  it('should get questions', () => {
    let store = mockStore({});
    const sheetId = 1;
    const questions = [{questionId: 1}, {questionId: 2}]
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {
        questions
      }
    }, {
      type: types.FINISH_FETCH
    }]
    return store.dispatch(actions.getQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should not get questions', () => {
    let store = mockStore({});
    const sheetId = 1;
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]
    return store.dispatch(actions.getQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should load questions', () => {
    let store = mockStore({});
    const sheetId = 1;
    const questions = [{questionId: 1}, {questionId: 2}]
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.STORE_QUESTIONS,
      payload: {
        sheetId,
        questions: {
          questions
        }
      }
    }, {
      type: types.FINISH_FETCH
    }]
    return store.dispatch(actions.loadQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  })

  it('should fail to load questions', () => {
    let store = mockStore({});
    const sheetId = 1;
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]
    return store.dispatch(actions.loadQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should create new questions', () => {
    let store = mockStore({
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
    }});
    const researchId = 1;
    const sheetId = 2;
    const questionType = 'CloseQuestion';
    const questionId = 1;
    const question = {
      questionId,
      title: 'foo',
    }
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    fetchMock.postOnce(`${window.base}create-question`, {questionId});
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    fetchMock.getOnce(`${window.base}get-question-structure/${questionId}`, {question})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {
        questions,
      }
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question
    }]
    return store.dispatch(actions.createNewQuestion(researchId, sheetId, questionType))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to create new questions', () => {
    let store = mockStore({
      locale: {
        languages: [{
          name: "English",
          code: 'en',
          active: true,
        }],
        translations: {}
    }});
    const researchId = 1;
    const sheetId = 2;
    const questionType = 'CloseQuestion';
    const questionId = 1;
    const question = {
      questionId,
      title: 'foo',
    }
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    fetchMock.postOnce(`${window.base}create-question`, {status: 500});
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    fetchMock.getOnce(`${window.base}get-question-structure/${questionId}`, {question})
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    },]
    return store.dispatch(actions.createNewQuestion(researchId, sheetId, questionType))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should get question structure', () => {
    let store = mockStore({});
    const questionId = 1;
    const question = {
      questionId,
      title: 'foo',
    }
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question,
    }]

    fetchMock.getOnce(`${window.base}get-question-structure/${questionId}`, {question})
    return store.dispatch(actions.getQuestionStructure(questionId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to get question structure', () => {
    let store = mockStore({});
    const questionId = 1;
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]

    fetchMock.getOnce(`${window.base}get-question-structure/${questionId}`, {status: 500})
    return store.dispatch(actions.getQuestionStructure(questionId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should delete question', () => {
    const sheetId = 1
    let store = mockStore({
      editor: {
        activeSheet: {
          sheetId
        }
      }
    });
    const questionId = 1;
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.DESELECT_QUESTION
    }]

    fetchMock.postOnce(`${window.base}delete-question`, {response: 'foo'})
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    return store.dispatch(actions.deleteQuestion(questionId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to delete question', () => {
    const sheetId = 1
    let store = mockStore({
      editor: {
        activeSheet: {
          sheetId
        }
      }
    });
    const questionId = 1;
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]

    fetchMock.postOnce(`${window.base}delete-question`, {status: 500})
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    return store.dispatch(actions.deleteQuestion(questionId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should update question information', () => {
    const sheetId = 1
    let store = mockStore({
      editor: {
        activeSheet: {
          sheetId
        }
      }
    });
    const questionId = 1;
    const question = {
      questionId,
      title: 'title'
    }
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question: {question}
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {questions}
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.FINISH_FETCH
    }]

    fetchMock.postOnce(`${window.base}synchronize-question`, {question})
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    return store.dispatch(actions.updateQuetionsInformation(question))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to update question information', () => {
    const sheetId = 1
    let store = mockStore({
      editor: {
        activeSheet: {
          sheetId
        }
      }
    });
    const questionId = 1;
    const question = {
      questionId,
      title: 'title'
    }
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]

    fetchMock.postOnce(`${window.base}synchronize-question`, {status: 500})
    return store.dispatch(actions.updateQuetionsInformation(question))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should remap questions', () => {
    const sheetId = 1
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    let store = mockStore({
      questions: {questions}
    });
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.DRAG_END
    }]

    fetchMock.postOnce(`${window.base}remap-questions`, {questions})
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions})
    return store.dispatch(actions.remapQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to remap questions', () => {
    const sheetId = 1
    const questions = [{foo: 'foo'}, {foo2: 'foo2'}];
    let store = mockStore({
      questions: {questions}
    });
    const expectedActions = [{
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]

    fetchMock.postOnce(`${window.base}remap-questions`, {status: 500})
    return store.dispatch(actions.remapQuestions(sheetId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should change mandatory question', () => {
    const questions = {activeQuestion: {foo: 'foo'}};
    const questionId = 1;
    const sheetId = 1;
    const question = {
      questionId,
      title: 'title'
    }
    let store = mockStore({
      questions: {questions},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.CHANGE_MANDATORY_QUESTION,
      mandatory: true
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question: {question}
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {questions}
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.FINISH_FETCH
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {question});
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions});
    return store.dispatch(actions.changeMandatoryQuestion(true))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })


  it('should fail to change mandatory question', () => {
    const questions = {activeQuestion: {foo: 'foo'}};
    const sheetId = 1;
    let store = mockStore({
      questions: {questions},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.CHANGE_MANDATORY_QUESTION,
      mandatory: true
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {status: 500});
    return store.dispatch(actions.changeMandatoryQuestion(true))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should set custom help', () => {
    const questions = {activeQuestion: {foo: 'foo'}};
    const questionId = 1;
    const sheetId = 1;
    const question = {
      questionId,
      title: 'title',
    }
    let store = mockStore({
      questions: {questions},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.SET_CUSTOM_HELP,
      hasCustomHelp: true
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question: {question}
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {questions}
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.FINISH_FETCH
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {question});
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions});
    return store.dispatch(actions.setCustomHelp(true))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to set custom help', () => {
    const questions = {activeQuestion: {foo: 'foo'}};
    const sheetId = 1;
    let store = mockStore({
      questions: {questions},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.SET_CUSTOM_HELP,
      hasCustomHelp: true
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED,
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {status: 500});
    return store.dispatch(actions.setCustomHelp(true))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should change question type', () => {
    const questions = {activeQuestion: {foo: 'foo'}};
    const questionId = 1;
    const sheetId = 1;
    const questionType = 'CloseQuestion';
    const question = {
      questionId,
      title: 'title',
    }
    let store = mockStore({
      questions: {activeQuestion: question},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.CHANGE_QUESTION_TYPE,
      questionType
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.SYNCHORNIZE_ACTIVE_QUESTION,
      question: {question}
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.GET_SHEET_QUESTIONS,
      questions: {questions}
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.FINISH_FETCH
    }, {
      type: types.FINISH_FETCH
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {question});
    fetchMock.getOnce(`${window.base}get-questions/${sheetId}`, {questions});
    return store.dispatch(actions.changeQuestionType(questionType))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to change question type', () => {
    const questionId = 1;
    const sheetId = 1;
    const questionType = 'CloseQuestion';
    const question = {
      questionId,
      title: 'title',
    }
    let store = mockStore({
      questions: {activeQuestion: question},
      editor: {
        activeSheet: {
          sheetId,
        }
      }
    });
    const expectedActions = [{
      type: types.CHANGE_QUESTION_TYPE,
      questionType
    }, {
      type: types.REQUEST_QUESTION
    }, {
      type: types.QUESTION_FETCH_FAILED,
    }, {
      type: types.FINISH_FETCH
    }]
    fetchMock.postOnce(`${window.base}synchronize-question`, {status: 500});
    return store.dispatch(actions.changeQuestionType(questionType))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fetch questions if needed', () => {
    const questionId = 1;
    const questionData = new Set();
    let store = mockStore({
      data: {
        questionData
      }
    });
    fetchMock.getOnce(`${window.base}get-question-answers/${questionId}`, {answers: []});
    return store.dispatch(actions.fetchQuestionIfNeeded(questionId))
    .then(() => {
      const time = store.getActions()[1].receivedAt;
      const expectedActions = [{
        type: types.REQUEST_QUESTION,
        questionId
      }, {
        type: types.RECEIVE_QUESTION_ANSWERS,
        question: {
          answers: []
        },
        questionId,
        receivedAt: time
      }]
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should not fetch questions. not needed', () => {
      const questionId = 1;
      const questionData = new Map();
      questionData.set(1 , {foo: 'foo'})
      let store = mockStore({
        data: {
          questionData
        }
      });
      expect(store.dispatch(actions.fetchQuestionIfNeeded(questionId))).toBeUndefined();
  })
});
