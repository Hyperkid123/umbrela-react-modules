import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Synchronous option actions', () => {
  it('should create changeOptionTitle action', () => {
    const title = 'foo';
    const optionOrder = 1;
    const expectedAction = {
      type: types.CHANGE_OPTION_TITLE,
      payload: {
        title,
        optionOrder
      }
    }
    expect(actions.changeOptionTitle(title, optionOrder)).toEqual(expectedAction);
  });

  it('should create dragOptionCard action', () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: types.DRAG_OPTION_CARD,
      dragIndex,
      hoverIndex,
    }
    expect(actions.dragOptionCard(dragIndex, hoverIndex)).toEqual(expectedAction);
  })
});

describe('Async option actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should recevice question options', () => {
    let store = mockStore({});
      const options = [{foo: 'foo'}];
    fetchMock.getOnce(`${window.base}get-question-options/1`, {options})
    const expectedActions = [{
      type: types.REQUEST_QUESTION_OPTIONS
    }, {
      type: types.GET_QUESTION_OPTIONS,
      options
    }]
    return store.dispatch(actions.getOptions(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to recevie question options', () => {
    let store = mockStore({});
    fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 500});
    return store.dispatch(actions.getOptions(1))
    .then(() => {
      expect(store.getActions()).toEqual([{type: types.REQUEST_QUESTION_OPTIONS}]);
    });
  })

  it('should load options', () => {
    let store = mockStore({});
    const options = [{foo: 'foo'}];
    const filters = [{foo: 'foo'}];
    const expectedActions = [{
      type: types.REQUEST_QUESTION_OPTIONS
    }, {
      type: types.STORE_OPTIONS,
      payload: {
        options,
        questionId: 1
      }
    }]
    fetchMock.getOnce(`${window.base}get-question-options/1`, {options});
    fetchMock.getOnce(`${window.base}get-question-options-filter/1`, {filters});
    return store.dispatch(actions.loadOptions(1))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to load options', () => {
    let store = mockStore({});
    fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 500});
    return store.dispatch(actions.loadOptions(1))
    .then(() => {
      expect(store.getActions()).toEqual([{type: types.REQUEST_QUESTION_OPTIONS}]);
    });
  })

  it('should synchronize option', () => {
    let store = mockStore({});
    const option = {foo: 'foo', questionId: 1};
    const options = [{foo: 'foo'}];
    const expectedActions = [{
      type: types.REQUEST_QUESTION_OPTIONS
    }, {
      type: types.REQUEST_QUESTION_OPTIONS
    }]
    fetchMock.postOnce(`${window.base}synchronize-option`, {option});
    fetchMock.getOnce(`${window.base}get-question-options/1`, {options});
    return store.dispatch(actions.synchronizeOption(option))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to synchronize option', () => {
    let store = mockStore({});
    const option = {foo: 'foo', questionId: 1};
    const expectedActions = [{
      type: types.REQUEST_QUESTION_OPTIONS
    }, {
      type: types.REQUEST_QUESTION_OPTIONS
    }]
    fetchMock.postOnce(`${window.base}synchronize-option`, {status: 500});
    fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 500});
    return store.dispatch(actions.synchronizeOption(option))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should remap options', () => {
    const options = [{optionId: 1}, {optionId: 2}];
      let store = mockStore({options: {options: options}});
      const expectedActions = [{
        type: types.REQUEST_QUESTION_OPTIONS
      }, {
        type: types.REQUEST_QUESTION_OPTIONS
      }, {
        type: types.DRAG_END
      }]
      fetchMock.postOnce(`${window.base}remap-options`, {options});
      fetchMock.getOnce(`${window.base}get-question-options/1`, {options});
      return store.dispatch(actions.remapOptions(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })

  it('should fail to remap options', () => {
    const options = [{optionId: 1}, {optionId: 2}];
      let store = mockStore({options: {options: options}});
      const expectedActions = [{
        type: types.REQUEST_QUESTION_OPTIONS
      }]
      fetchMock.postOnce(`${window.base}remap-options`, {status: 500});
      fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 500});
      return store.dispatch(actions.remapOptions(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })

  it('should delete option', () => {
    const option = {optionId: 1};
      let store = mockStore({questions: {
        activeQuestion: {
          questionId: 1
        }
      }});
      const expectedActions = [{
        type: types.REQUEST_QUESTION_OPTIONS
      }, {
        type: types.REQUEST_QUESTION_OPTIONS
      }]
      fetchMock.postOnce(`${window.base}delete-option`, {option});
      fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 200});
      return store.dispatch(actions.deleteOption(option))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })

  it('should fail to delete option', () => {
    const option = {optionId: 1};
    let store = mockStore({questions: {
      activeQuestion: {
        questionId: 1
      }
    }});
    const expectedActions = [{
      type: types.REQUEST_QUESTION_OPTIONS
    }, {
      type: types.REQUEST_QUESTION_OPTIONS
    }]
    fetchMock.postOnce(`${window.base}delete-option`, {status: 500});
    fetchMock.getOnce(`${window.base}get-question-options/1`, {status: 200});
    return store.dispatch(actions.deleteOption(option))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should save filter', () => {
    const optionId = 1;
    const questionId = 1;
    const checked = true;
    let store = mockStore({});
    const expectedActions = [{
      type: types.SWITCH_FILTER,
      payload: {
        optionId,
        questionId,
        checked
      }
    }];
    fetchMock.postOnce(`${window.base}save-filter`, {optionId, questionId, checked});
    return store.dispatch(actions.saveFilter(optionId, questionId, checked))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})
