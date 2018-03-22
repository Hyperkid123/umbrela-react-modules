import * as actions from '../../../redux/actions/';
import * as types from '../../../redux/actions/actionTypes';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Synchronous research actions', () => {
  it('should create selectEditorSheet action', () => {
    const sheetId = 1;
    const expectedAction = {
      type: types.SELECT_EDITOR_SHEET,
      sheetId
    }
    expect(actions.selectEditorSheet(sheetId)).toEqual(expectedAction)
  })

  it('should create chnageSheetTitle action', () => {
    const title = 'foo';
    const expectedAction = {
      type: types.CHANGE_SHEET_TITLE,
      title
    }
    expect(actions.changeSheetTitle(title)).toEqual(expectedAction);
  })

  it('should create dragSheetCard action', () => {
    const dragIndex = 1;
    const hoverIndex = 2;
    const expectedAction = {
      type: types.DRAG_SHEET_CARD,
      dragIndex,
      hoverIndex,
    }
    expect(actions.dragSheetCard(dragIndex, hoverIndex)).toEqual(expectedAction);
  })
});

describe('Async research actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('should get sheets', () => {
    let store = mockStore({});
    const researchId = 1;
    const sheets = [{sheetId: 1}, {sheetId: 2}]
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {sheets})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.GET_RESEARCH_SHEETS,
      sheets: {sheets}
    }]
    return store.dispatch(actions.getSheets(researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to get sheets', () => {
    let store = mockStore({});
    const researchId = 1;
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.RESEARCH_FETCH_FAILED
    }]
    return store.dispatch(actions.getSheets(researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should create new sheet', () => {
    let store = mockStore({});
    const researchId = 1;
    const sheetTitle = 'foo';
    const sheets = [{sheetId: 1}, {sheetId: 2}]
    fetchMock.postOnce(`${window.base}create-sheet/${researchId}`, {sheets})
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {sheets})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.REQUEST_SHEETS,
    }, {
      type: types.FINISH_FETCH
    }]
    return store.dispatch(actions.createNewSheet(sheetTitle))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail create new sheet', () => {
    let store = mockStore({});
    const researchId = 1;
    const sheetTitle = 'foo';
    fetchMock.postOnce(`${window.base}create-sheet/${researchId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.RESEARCH_FETCH_FAILED,
    }]
    return store.dispatch(actions.createNewSheet(sheetTitle))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should delete sheet', () => {
    let store = mockStore({});
    const researchId = 1;
    const sheetId = 2
    const sheets = [{sheetId: 1}, {sheetId: 2}]
    fetchMock.postOnce(`${window.base}delete-sheet/${researchId}`, {foo: 'foo'})
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {sheets})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.DESELECT_ACTIVE_SHEET,
    }, {
      type: types.REQUEST_SHEETS
    }]
    return store.dispatch(actions.deleteSheet(sheetId, researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to delete sheet', () => {
    let store = mockStore({});
    const researchId = 1;
    const sheetId = 2
    fetchMock.postOnce(`${window.base}delete-sheet/${researchId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.RESEARCH_FETCH_FAILED
    }]
    return store.dispatch(actions.deleteSheet(sheetId, researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should update sheet information', () => {
    const researchId = 1;
    const sheetId = 2
    const newSheet = {
      sheetId,
      title: 'title'
    }
    const sheet = {
      sheetId,
      title: 'foo'
    }
    const sheets = [{sheetId: 1}, sheet]
    let store = mockStore({
      editor: {
        sheets
      }
    });
    fetchMock.postOnce(`${window.base}update-sheet/`, {newSheet})
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {sheets})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.REQUEST_SHEETS
    }]
    return store.dispatch(actions.updateSheetInformation(newSheet, researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to update sheet information', () => {
    const researchId = 1;
    const sheetId = 2
    const newSheet = {
      sheetId,
      title: 'title'
    }
    const sheet = {
      sheetId,
      title: 'foo'
    }
    const sheets = [{sheetId: 1}, sheet]
    let store = mockStore({
      editor: {
        sheets
      }
    });
    fetchMock.postOnce(`${window.base}update-sheet/`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.RESEARCH_FETCH_FAILED
    }]
    return store.dispatch(actions.updateSheetInformation(newSheet, researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should remap sheets', () => {
    const researchId = 1;
    const sheetId = 2
    const sheet = {
      sheetId,
      title: 'foo'
    }
    const sheets = [{sheetId: 1}, sheet]
    let store = mockStore({
      editor: {
        sheets
      }
    });
    fetchMock.postOnce(`${window.base}remap-sheets/${researchId}`, {sheets})
    fetchMock.getOnce(`${window.base}get-sheets/${researchId}`, {sheets})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.REQUEST_SHEETS
    }, {
      type: types.DRAG_END
    }]
    return store.dispatch(actions.remapSheets(researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should fail to remap sheets', () => {
    const researchId = 1;
    const sheetId = 2
    const sheet = {
      sheetId,
      title: 'foo'
    }
    const sheets = [{sheetId: 1}, sheet]
    let store = mockStore({
      editor: {
        sheets
      }
    });
    fetchMock.postOnce(`${window.base}remap-sheets/${researchId}`, {status: 500})
    const expectedActions = [{
      type: types.REQUEST_SHEETS
    }, {
      type: types.RESEARCH_FETCH_FAILED
    }]
    return store.dispatch(actions.remapSheets(researchId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('should not update sheet information with same title', () => {
    const researchId = 1;
    const sheetId = 2
    const newSheet = {
      sheetId,
      title: 'title'
    }
    const sheet = {
      sheetId,
      title: 'title'
    }
    const sheets = [{sheetId: 1}, sheet]
    let store = mockStore({
      editor: {
        sheets
      }
    });
    expect(
      store.dispatch(
        actions.updateSheetInformation(
          newSheet, researchId
        )
      )
    ).toBeUndefined()
  })
});
